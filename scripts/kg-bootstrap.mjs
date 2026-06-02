#!/usr/bin/env node
/**
 * Planning → developing: mechanical KG bootstrap (no LLM).
 * - Ensures graphify.config.json exists
 * - Runs graphify update . for code AST baseline
 * - Agent runs semantic domain extraction (/graphify on bootstrap docs) before --write-receipt
 */
import {
  findRepoRoot,
  loadGraphifyConfig,
  runCommand,
  graphifyAvailable,
  writeBootstrapReceipt,
  archiveCanonicalDocs,
  agentDir,
} from "./kg-lib.mjs";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const writeReceipt = args.includes("--write-receipt");
const archiveDocs = args.includes("--archive-docs");
const codeOnly = args.includes("--code-only");

async function ensureConfig(repoRoot, config, configPath) {
  if (configPath) return;
  const target = join(agentDir(repoRoot), "graphify.config.json");
  await mkdir(agentDir(repoRoot), { recursive: true });
  await writeFile(target, JSON.stringify(config, null, 2) + "\n", "utf8");
  console.log(`[kg:bootstrap] Wrote default ${target}`);
}

async function main() {
  const repoRoot = findRepoRoot();
  const { config, path: configPath } = await loadGraphifyConfig(repoRoot);
  await ensureConfig(repoRoot, config, configPath);

  if (!graphifyAvailable()) {
    console.error("[kg:bootstrap] graphify not found on PATH — install graphifyy (pip/uv) first.");
    process.exit(1);
  }

  if (archiveDocs && !writeReceipt) {
    await archiveCanonicalDocs(repoRoot, config.bootstrap.sources);
    console.log("[kg:bootstrap] Archived bootstrap canonical docs to .agent/memory/canonical-archive/");
  }

  if (!writeReceipt) {
    const r = runCommand("graphify", ["update", "."], repoRoot);
    if (!r.ok) {
      console.error(r.stderr || r.stdout);
      process.exit(r.status);
    }
    console.log(r.stdout.trim());
    if (codeOnly) {
      console.log("[kg:bootstrap] Code graph baseline updated (AST only).");
    } else {
      console.log(
        "[kg:bootstrap] Next: agent runs domain/concept extraction on bootstrap docs (/graphify — semantic pass on .agent canonical files per graphify.config.json), then:",
      );
      console.log("  npm run kg:bootstrap -- --write-receipt");
    }
    return;
  }

  if (archiveDocs) {
    await archiveCanonicalDocs(repoRoot, config.bootstrap.sources);
  }

  const receipt = await writeBootstrapReceipt(repoRoot, config, {
    command: `npm run kg:bootstrap${archiveDocs ? " -- --archive-docs" : ""} -- --write-receipt`,
  });

  if (receipt.status !== "ok") {
    console.error("[kg:bootstrap] Receipt incomplete:");
    for (const e of receipt.errors ?? []) console.error(`  - ${e}`);
    process.exit(1);
  }

  console.log(`[kg:bootstrap] Receipt ok — ${receipt.graph.nodes} nodes, ${receipt.graph.domainNodes} domain nodes`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
