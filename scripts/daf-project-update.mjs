#!/usr/bin/env node
/**
 * Mechanical project refresh after /daf-onboard — overlays + scaffold merge + daf-pin.
 */
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readGlobalPlatforms } from "../packages/cli/dist/global-platforms.js";
import { getGlobalAgentDir } from "../packages/cli/dist/paths.js";
import { refreshProjectDaf } from "../packages/cli/dist/project-update.js";

function findRepoRoot(start) {
  let dir = resolve(start);
  while (true) {
    if (existsSync(join(dir, ".agent", "config.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function usage() {
  console.error("Usage: node scripts/daf-project-update.mjs [--cwd <repo>] [--force]");
  process.exit(2);
}

const here = dirname(fileURLToPath(import.meta.url));
if (!existsSync(join(here, "..", "packages", "cli", "dist", "project-update.js"))) {
  console.error("Run npm run build first (packages/cli/dist missing).");
  process.exit(2);
}

let cwd = process.cwd();
let force = false;
for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === "--force") {
    force = true;
    continue;
  }
  if (arg === "--cwd") {
    const next = process.argv[++i];
    if (!next) usage();
    cwd = next;
    continue;
  }
  if (arg.startsWith("--cwd=")) {
    cwd = arg.slice("--cwd=".length);
    continue;
  }
  usage();
}

const repoRoot = findRepoRoot(cwd);
if (!repoRoot) {
  console.error("No .agent/config.json found from cwd.");
  process.exit(1);
}

const globalDir = getGlobalAgentDir();
const { platforms } = await readGlobalPlatforms(globalDir);
const result = await refreshProjectDaf({ repoRoot, globalDir, platforms, force });
console.log(`Updated project daf-pin → ${result.pin}`);
console.log(`Overlays applied → ${result.appliedPlatforms.join(", ") || "(none)"}`);
