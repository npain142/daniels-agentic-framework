#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { installGlobalAgent } from "./global-install.js";
import { collectHealthReport, formatHealthReport } from "./health.js";
import {
  checkDafVersion,
  formatStatusLine,
  readPin,
  resolveDafRepoForVersionCheck,
  resolveDafRepoRoot,
} from "./daf-version.js";
import { parsePlatformsList } from "./platform.js";
import { findAgentDir, getCliPackageRoot, getGlobalAgentDir, resolveInstallPin } from "./paths.js";

const PKG_VERSION = await readFile(join(getCliPackageRoot(), "package.json"), "utf8")
  .then((raw) => (JSON.parse(raw) as { version?: string }).version ?? "0.0.0")
  .catch(() => "0.0.0");

function usage(): never {
  console.error(`Usage: daf <command> [options]

Commands:
  onboard       Install machine-wide DAF globals (~/.config/agent/)
  version-check Print one-line template freshness (ok | *-stale)
  health        Project + global status dashboard

Options (onboard):
  --platforms <ids>   Comma-separated: generic,cursor,claude,codex (default: generic)
  --platform <id>     Repeatable platform id (legacy)
  --force             Overwrite existing global files

Options (version-check, health):
  --cwd <path>        Project directory (default: cwd)
  --repo <path>       DAF install root for version comparison`);
  process.exit(2);
}

type ParsedArgs = {
  command: string | undefined;
  platforms: string[];
  force: boolean;
  cwd: string;
  repo: string | null;
};

function parseArgs(argv: string[]): ParsedArgs {
  const platforms: string[] = [];
  let force = false;
  let cwd = process.cwd();
  let repo: string | null = process.env.DAF_REPO?.trim() || null;
  let command: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === undefined) continue;
    if (command === undefined && !arg.startsWith("-")) {
      command = arg;
      continue;
    }
    if (arg === "--force") {
      force = true;
      continue;
    }
    if (arg === "--platforms") {
      const next = argv[++i];
      if (!next) usage();
      platforms.push(next);
      continue;
    }
    if (arg.startsWith("--platforms=")) {
      platforms.push(arg.slice("--platforms=".length));
      continue;
    }
    if (arg === "--platform") {
      const next = argv[++i];
      if (!next) usage();
      platforms.push(next);
      continue;
    }
    if (arg.startsWith("--platform=")) {
      platforms.push(arg.slice("--platform=".length));
      continue;
    }
    if (arg === "--cwd") {
      const next = argv[++i];
      if (!next) usage();
      cwd = next;
      continue;
    }
    if (arg.startsWith("--cwd=")) {
      cwd = arg.slice("--cwd=".length);
      continue;
    }
    if (arg === "--repo") {
      const next = argv[++i];
      if (!next) usage();
      repo = next;
      continue;
    }
    if (arg.startsWith("--repo=")) {
      repo = arg.slice("--repo=".length);
      continue;
    }
    usage();
  }

  return { command, platforms, force, cwd, repo };
}

async function runVersionCheck(cwd: string, repoArg: string | null): Promise<void> {
  const globalDir = getGlobalAgentDir();
  const agentDir = findAgentDir(cwd);
  const fileRepo = await resolveDafRepoRoot(globalDir);
  const repoRoot = resolveDafRepoForVersionCheck({
    cwd,
    envRepo: repoArg ?? process.env.DAF_REPO,
    fileRepo,
  });
  const globalPin = await readPin(globalDir);
  const projectPin = agentDir ? await readPin(agentDir) : null;
  const repoHead = repoRoot ? await resolveInstallPin(repoRoot) : null;
  const status = checkDafVersion({ globalPin, projectPin, repoHead });
  console.log(formatStatusLine(status));
}

async function runOnboard(platforms: string[], force: boolean): Promise<void> {
  const parsed = platforms.length > 0 ? parsePlatformsList(platforms) : parsePlatformsList(["generic"]);
  const result = await installGlobalAgent({ force, platforms: parsed });
  console.log(`Installed global agent files → ${result.globalDir}`);
  console.log(`Platforms → ${result.platforms.join(", ")}`);
  if (result.cursorSkillsRoot) {
    console.log(`Installed Cursor skills → ${result.cursorSkillsRoot}`);
  }
  if (result.claudeSkillsRoot) {
    console.log(`Installed Claude skills → ${result.claudeSkillsRoot}`);
  }
  if (result.codexHome) {
    console.log(`Installed Codex global AGENTS.md → ${result.codexHome}`);
  }
  console.log("");
  console.log("Next: open a project and run /daf-setup in chat.");
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes("--version") || args.includes("-V")) {
    console.log(PKG_VERSION);
    return;
  }

  const { command, platforms, force, cwd, repo } = parseArgs(args);
  if (!command) usage();

  switch (command) {
    case "onboard":
      await runOnboard(platforms, force);
      break;
    case "version-check":
      await runVersionCheck(cwd, repo);
      break;
    case "health": {
      const report = await collectHealthReport(cwd);
      console.log(formatHealthReport(report));
      break;
    }
    default:
      usage();
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
