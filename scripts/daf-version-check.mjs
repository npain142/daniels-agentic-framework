#!/usr/bin/env node
/**
 * DAF repo runner for version check (same one-line output as ~/.config/agent/daf-version-check.mjs).
 */
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checkDafVersion, formatStatusLine, readPin, resolveRepoHead } from "../packages/cli/dist/daf-version.js";
import { getGlobalAgentDir, getRepoRoot } from "../packages/cli/dist/paths.js";

function findAgentDir(start) {
  let dir = resolve(start);
  while (true) {
    const agentDir = join(dir, ".agent");
    if (existsSync(join(agentDir, "config.json"))) return agentDir;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function parseArgs(argv) {
  let cwd = process.cwd();
  let repoRoot = process.env.DAF_REPO?.trim() || getRepoRoot();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--cwd" && argv[i + 1]) {
      cwd = argv[++i];
      continue;
    }
    if (arg.startsWith("--cwd=")) {
      cwd = arg.slice("--cwd=".length);
      continue;
    }
    if (arg === "--repo" && argv[i + 1]) {
      repoRoot = argv[++i];
      continue;
    }
    if (arg.startsWith("--repo=")) {
      repoRoot = arg.slice("--repo=".length);
      continue;
    }
  }
  return { cwd, repoRoot };
}

const here = dirname(fileURLToPath(import.meta.url));
if (!existsSync(join(here, "..", "packages", "cli", "dist", "daf-version.js"))) {
  console.error("Run npm run build first (packages/cli/dist missing).");
  process.exit(2);
}

const { cwd, repoRoot } = parseArgs(process.argv.slice(2));
const globalDir = getGlobalAgentDir();
const agentDir = findAgentDir(cwd);

const globalPin = await readPin(globalDir);
const projectPin = agentDir ? await readPin(agentDir) : null;
const repoHead = repoRoot ? resolveRepoHead(repoRoot) : null;

const status = checkDafVersion({ globalPin, projectPin, repoHead });
console.log(formatStatusLine(status));
