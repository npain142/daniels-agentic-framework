#!/usr/bin/env node
/**
 * Mechanical global install — invoked by the agent during /onboard.
 * Requires: npm run build (packages/cli dist must exist).
 */
import { installGlobalAgent } from "../packages/cli/dist/global-install.js";
import { parsePlatform } from "../packages/cli/dist/platform.js";

function usage() {
  console.error(`Usage: node scripts/global-install.mjs [--platform generic|cursor] [--force]`);
  process.exit(2);
}

let platform = "generic";
let force = false;

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === "--force") {
    force = true;
    continue;
  }
  if (arg === "--platform") {
    const next = process.argv[++i];
    if (!next) usage();
    platform = next;
    continue;
  }
  if (arg.startsWith("--platform=")) {
    platform = arg.slice("--platform=".length);
    continue;
  }
  usage();
}

try {
  const { globalDir, cursorSkillsRoot } = await installGlobalAgent({
    force,
    platform: parsePlatform(platform),
  });
  console.log(`Installed global agent files → ${globalDir}`);
  if (cursorSkillsRoot) {
    console.log(`Installed Cursor skills → ${cursorSkillsRoot}`);
  }
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
