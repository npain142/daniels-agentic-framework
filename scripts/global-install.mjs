#!/usr/bin/env node
/**
 * Mechanical global install — invoked by the agent during /onboard.
 * Requires: npm run build (packages/cli dist must exist).
 */
import { installGlobalAgent } from "../packages/cli/dist/global-install.js";
import { parsePlatform, parsePlatformsList } from "../packages/cli/dist/platform.js";

function usage() {
  console.error(
    `Usage: node scripts/global-install.mjs [--platforms generic,cursor,claude,codex] [--platform <id>]... [--force]`,
  );
  process.exit(2);
}

const platformArgs = [];
let force = false;

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === "--force") {
    force = true;
    continue;
  }
  if (arg === "--platforms") {
    const next = process.argv[++i];
    if (!next) usage();
    platformArgs.push(next);
    continue;
  }
  if (arg.startsWith("--platforms=")) {
    platformArgs.push(arg.slice("--platforms=".length));
    continue;
  }
  if (arg === "--platform") {
    const next = process.argv[++i];
    if (!next) usage();
    platformArgs.push(next);
    continue;
  }
  if (arg.startsWith("--platform=")) {
    platformArgs.push(arg.slice("--platform=".length));
    continue;
  }
  usage();
}

const platforms =
  platformArgs.length > 0 ? parsePlatformsList(platformArgs) : [parsePlatform("generic")];

try {
  const result = await installGlobalAgent({ force, platforms });
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
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
