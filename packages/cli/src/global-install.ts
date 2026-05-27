import { cp, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";
import { installFlatMarkdownSkills } from "./platforms/cursor.js";
import { installCursorGlobalSkills } from "./platforms/cursor.js";
import { installClaudeGlobalSkills } from "./platforms/claude.js";
import { installCodexGlobalAgents } from "./platforms/codex.js";
import type { Platform } from "./platform.js";
import { writeGlobalPlatforms } from "./global-platforms.js";
import { stashPlatformProjectTemplates } from "./project-overlays.js";
import {
  getClaudeSkillsRoot,
  getCodexHome,
  getCursorSkillsRoot,
  getGlobalAgentDir,
  getTemplatesRoot,
} from "./paths.js";

async function copyDirMerge(src: string, dest: string, force: boolean): Promise<void> {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const ent of entries) {
    const from = join(src, ent.name);
    const to = join(dest, ent.name);
    if (ent.isDirectory()) {
      await copyDirMerge(from, to, force);
    } else {
      if (!existsSync(to) || force) {
        await mkdir(dirname(to), { recursive: true });
        await cp(from, to);
      }
    }
  }
}

async function copyGlobalTemplateExcludingSkills(globalTpl: string, globalDir: string, force: boolean): Promise<void> {
  await mkdir(globalDir, { recursive: true });
  const entries = await readdir(globalTpl, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.name === "skills") continue;
    const from = join(globalTpl, ent.name);
    const to = join(globalDir, ent.name);
    if (ent.isDirectory()) {
      await copyDirMerge(from, to, force);
    } else {
      if (!existsSync(to) || force) {
        await mkdir(dirname(to), { recursive: true });
        await cp(from, to);
      }
    }
  }
}

export type InstallGlobalAgentOpts = {
  force: boolean;
  platforms: Platform[];
};

export type InstallGlobalAgentResult = {
  globalDir: string;
  platforms: Platform[];
  cursorSkillsRoot?: string;
  claudeSkillsRoot?: string;
  codexHome?: string;
};

function hasIdePlatform(platforms: Platform[], id: Platform): boolean {
  return platforms.includes(id);
}

/** Copy templates/global; install skills per platform; write platforms.json. */
export async function installGlobalAgent(opts: InstallGlobalAgentOpts): Promise<InstallGlobalAgentResult> {
  const templates = getTemplatesRoot();
  const globalDir = getGlobalAgentDir();
  const globalTpl = join(templates, "global");
  const stacksTpl = join(templates, "stacks");
  const platforms = opts.platforms.length > 0 ? opts.platforms : (["generic"] as Platform[]);

  if (!existsSync(globalTpl)) {
    throw new Error(`Missing template directory: ${globalTpl}`);
  }
  await mkdir(globalDir, { recursive: true });
  await copyGlobalTemplateExcludingSkills(globalTpl, globalDir, opts.force);
  await installFlatMarkdownSkills({
    templatesRoot: templates,
    globalSkillsDir: join(globalDir, "skills"),
    force: opts.force,
  });
  if (existsSync(stacksTpl)) {
    const stacksDest = join(globalDir, "stacks");
    await mkdir(stacksDest, { recursive: true });
    await copyDirMerge(stacksTpl, stacksDest, opts.force);
  }
  for (const rootFile of ["root-AGENTS.md", "root-BACKLOG.md", "root-LOGBACK.md"] as const) {
    const rootTpl = join(templates, rootFile);
    if (existsSync(rootTpl)) {
      const rootDest = join(globalDir, rootFile);
      if (!existsSync(rootDest) || opts.force) {
        await cp(rootTpl, rootDest);
      }
    }
  }

  await stashPlatformProjectTemplates({
    templatesRoot: templates,
    globalDir,
    platforms,
    force: opts.force,
  });

  let cursorSkillsRoot: string | undefined;
  let claudeSkillsRoot: string | undefined;
  let codexHome: string | undefined;

  if (hasIdePlatform(platforms, "cursor")) {
    cursorSkillsRoot = getCursorSkillsRoot();
    await installCursorGlobalSkills({
      templatesRoot: templates,
      skillsRoot: cursorSkillsRoot,
      force: opts.force,
    });
  }
  if (hasIdePlatform(platforms, "claude")) {
    claudeSkillsRoot = getClaudeSkillsRoot();
    await installClaudeGlobalSkills({
      templatesRoot: templates,
      skillsRoot: claudeSkillsRoot,
      force: opts.force,
    });
  }
  if (hasIdePlatform(platforms, "codex")) {
    codexHome = getCodexHome();
    await installCodexGlobalAgents({
      templatesRoot: templates,
      codexHome,
      force: opts.force,
    });
  }

  await writeGlobalPlatforms(globalDir, { platforms });

  return { globalDir, platforms, cursorSkillsRoot, claudeSkillsRoot, codexHome };
}
