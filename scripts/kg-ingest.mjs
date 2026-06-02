#!/usr/bin/env node
/**
 * Developing / maintaining: merge new knowledge into graphify-out/.
 * - Always: graphify update . (code AST, no LLM)
 * - Canonical doc changes: sets needs_update or reports — agent runs /daf-kg-ingest semantic pass
 */
import {
  findRepoRoot,
  loadGraphifyConfig,
  runCommand,
  graphifyAvailable,
  sourceFingerprints,
  agentDir,
} from "./kg-lib.mjs";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

async function loadIngestState(repoRoot) {
  const path = join(agentDir(repoRoot), "kg-ingest-state.json");
  if (!existsSync(path)) return { path, state: null };
  return { path, state: JSON.parse(await readFile(path, "utf8")) };
}

async function main() {
  const repoRoot = findRepoRoot();
  const { config } = await loadGraphifyConfig(repoRoot);

  if (!graphifyAvailable()) {
    console.error("[kg:ingest] graphify not found on PATH.");
    process.exit(1);
  }

  const codeParts = config.ingest.codeCommand.split(/\s+/);
  const codeCmd = codeParts[0];
  const codeArgs = codeParts.slice(1);
  const r = runCommand(codeCmd, codeArgs, repoRoot);
  if (!r.ok) {
    console.error(r.stderr || r.stdout);
    process.exit(r.status);
  }
  console.log(r.stdout.trim());

  const canonical = config.ingest.canonicalSources ?? [];
  const fingerprints = sourceFingerprints(repoRoot, canonical);
  const { path: statePath, state: prev } = await loadIngestState(repoRoot);
  const changed =
    !prev?.fingerprints ||
    canonical.some((s) => prev.fingerprints[s] !== fingerprints[s]);

  await writeFile(
    statePath,
    JSON.stringify({ at: new Date().toISOString(), fingerprints }, null, 2) + "\n",
    "utf8",
  );

  const needsUpdateFlag = join(repoRoot, config.outputDir, "needs_update");
  const check = runCommand("graphify", ["check-update", "."], repoRoot);
  if (check.stdout) console.log(check.stdout.trim());
  if (check.stderr) console.error(check.stderr.trim());

  if (changed) {
    console.log(
      "[kg:ingest] Canonical docs changed since last ingest — run /daf-kg-ingest (semantic merge) or /graphify --update on bootstrap sources.",
    );
  } else {
    console.log("[kg:ingest] Code graph updated; canonical doc fingerprints unchanged.");
  }

  if (existsSync(needsUpdateFlag)) {
    process.exit(2);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
