import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

export const DEFAULT_GRAPHIFY_CONFIG = {
  outputDir: "graphify-out",
  bootstrap: {
    sources: [
      "PRD.md",
      "GLOSSARY.md",
      "ARCHITECTURE.md",
      "AGENTS.md",
      "phases/planning.md",
      "phases/developing.md",
      "phases/maintaining.md",
    ],
    minDomainNodes: 3,
  },
  ingest: {
    canonicalSources: ["PRD.md", "GLOSSARY.md", "ARCHITECTURE.md"],
    codeCommand: "graphify update .",
  },
};

export function findRepoRoot(cwd = process.cwd()) {
  let dir = resolve(cwd);
  for (let i = 0; i < 12; i++) {
    if (existsSync(join(dir, ".agent", "config.json"))) return dir;
    const parent = resolve(dir, "..");
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error("No .agent/config.json found — run from a DAF project root.");
}

export function agentDir(repoRoot) {
  return join(repoRoot, ".agent");
}

export async function loadGraphifyConfig(repoRoot) {
  const path = join(agentDir(repoRoot), "graphify.config.json");
  if (!existsSync(path)) return { path: null, config: structuredClone(DEFAULT_GRAPHIFY_CONFIG) };
  const raw = await readFile(path, "utf8");
  const parsed = JSON.parse(raw);
  return {
    path,
    config: {
      ...DEFAULT_GRAPHIFY_CONFIG,
      ...parsed,
      bootstrap: { ...DEFAULT_GRAPHIFY_CONFIG.bootstrap, ...parsed.bootstrap },
      ingest: { ...DEFAULT_GRAPHIFY_CONFIG.ingest, ...parsed.ingest },
    },
  };
}

export function resolveAgentSources(repoRoot, sources) {
  const base = agentDir(repoRoot);
  return sources.map((s) => join(base, s));
}

export function runCommand(cmd, args, cwd) {
  const r = spawnSync(cmd, args, { cwd, encoding: "utf8", shell: false });
  return { ok: r.status === 0, status: r.status ?? 1, stdout: r.stdout ?? "", stderr: r.stderr ?? "" };
}

export function graphifyAvailable() {
  const r = spawnSync("which", ["graphify"], { encoding: "utf8" });
  return r.status === 0 && Boolean(r.stdout?.trim());
}

export function readGraphStats(repoRoot, outputDir) {
  const graphPath = join(repoRoot, outputDir, "graph.json");
  if (!existsSync(graphPath)) return null;
  const data = JSON.parse(readFileSync(graphPath, "utf8"));
  const nodes = data.nodes ?? [];
  const domainTypes = new Set(["document", "rationale", "concept", "paper"]);
  const domainNodes = nodes.filter((n) => domainTypes.has(n.file_type));
  return {
    nodes: nodes.length,
    edges: (data.links ?? data.edges ?? []).length,
    domainNodes: domainNodes.length,
  };
}

export function sourceFingerprints(repoRoot, relSources) {
  const base = agentDir(repoRoot);
  const out = {};
  for (const rel of relSources) {
    const abs = join(base, rel);
    if (!existsSync(abs)) continue;
    const buf = readFileSync(abs);
    out[rel] = createHash("sha256").update(buf).digest("hex").slice(0, 16);
  }
  return out;
}

export async function writeBootstrapReceipt(repoRoot, config, extra = {}) {
  const relSources = config.bootstrap.sources.filter((s) =>
    existsSync(join(agentDir(repoRoot), s)),
  );
  const required = ["PRD.md", "GLOSSARY.md", "ARCHITECTURE.md"];
  const missingRequired = required.filter((s) => !relSources.includes(s));
  const stats = readGraphStats(repoRoot, config.outputDir);
  const receipt = {
    status: missingRequired.length || !stats || stats.domainNodes < config.bootstrap.minDomainNodes ? "incomplete" : "ok",
    at: new Date().toISOString(),
    command: extra.command ?? "npm run kg:bootstrap -- --write-receipt",
    sources: relSources,
    fingerprints: sourceFingerprints(repoRoot, relSources),
    graph: stats,
    ...extra,
  };
  if (missingRequired.length) {
    receipt.errors = [`Missing bootstrap sources: ${missingRequired.join(", ")}`];
  } else if (!stats) {
    receipt.errors = ["graphify-out/graph.json not found — run domain bootstrap (/graphify) then --write-receipt"];
  } else if (stats.domainNodes < config.bootstrap.minDomainNodes) {
    receipt.errors = [
      `Domain nodes (${stats.domainNodes}) below minDomainNodes (${config.bootstrap.minDomainNodes}) — run semantic extraction on bootstrap docs`,
    ];
  }
  const outPath = join(agentDir(repoRoot), "kg-bootstrap.json");
  await writeFile(outPath, JSON.stringify(receipt, null, 2) + "\n", "utf8");
  return receipt;
}

export async function archiveCanonicalDocs(repoRoot, relSources) {
  const base = agentDir(repoRoot);
  const archiveDir = join(base, "memory", "canonical-archive");
  await mkdir(archiveDir, { recursive: true });
  for (const rel of relSources) {
    const src = join(base, rel);
    if (!existsSync(src)) continue;
    const dest = join(archiveDir, rel.replace(/\//g, "__"));
    await mkdir(resolve(dest, ".."), { recursive: true });
    await copyFile(src, dest);
    const stub = `# Archived canonical stub\n\nFull text: \`.agent/memory/canonical-archive/${rel.replace(/\//g, "__")}\`\n\nQuery the knowledge graph (\`graphify query\`) or read the archive file for full content.\n`;
    await writeFile(src, stub, "utf8");
  }
}
