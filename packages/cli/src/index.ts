#!/usr/bin/env node
import { Command } from "commander";
import { installGlobalAgent } from "./global-install.js";
import { parsePlatform, type Platform } from "./platform.js";

async function cmdGlobalSetup(opts: { force: boolean; platform: Platform }): Promise<void> {
  try {
    const { globalDir, cursorSkillsRoot } = await installGlobalAgent(opts);
    console.log(`Installed global agent files → ${globalDir}`);
    if (cursorSkillsRoot) {
      console.log(`Installed Cursor skills → ${cursorSkillsRoot}`);
    }
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  }
}

const program = new Command();
program.name("daf").description("Daniel Agent Framework — global-setup").version("0.1.0");

program
  .command("global-setup")
  .description(
    "Copy templates/global (skills, identity, scaffold), templates/stacks, optional root-AGENTS pointer; with --platform cursor also Cursor skills and ~/.config/agent/platforms/cursor/project/",
  )
  .option("--force", "overwrite existing files", false)
  .option("--platform <platform>", 'IDE integration: "generic" or "cursor"', "generic")
  .action(async (opts: { force: boolean; platform: string }) => {
    await cmdGlobalSetup({ force: opts.force, platform: parsePlatform(opts.platform) });
  });

await program.parseAsync(process.argv);
