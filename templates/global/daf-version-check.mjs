#!/usr/bin/env node
/**
 * Token-minimal DAF version check — installed to ~/.config/agent/daf-version-check.mjs
 * Output one line: ok | global-stale | project-stale | both-stale
 */
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { checkDafVersion, formatStatusLine, readPin, resolveRepoHead } from "./daf-version-lib.mjs";

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
  let repoRoot = process.env.DAF_REPO?.trim() || null;
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

const { cwd, repoRoot } = parseArgs(process.argv.slice(2));
const globalDir = process.env.DAFE_GLOBAL_ROOT?.trim() || join(homedir(), ".config", "agent");
const agentDir = findAgentDir(cwd);

const globalPin = await readPin(globalDir);
const projectPin = agentDir ? await readPin(agentDir) : null;
const repoHead = repoRoot ? resolveRepoHead(repoRoot) : null;

const status = checkDafVersion({ globalPin, projectPin, repoHead });
console.log(formatStatusLine(status));
