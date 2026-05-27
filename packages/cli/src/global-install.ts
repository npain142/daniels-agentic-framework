import { cp, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";
import { installCursorGlobalSkills, installFlatMarkdownSkills } from "./platforms/cursor.js";
import type { Platform } from "./platform.js";
import { getCursorSkillsRoot, getGlobalAgentDir, getTemplatesRoot } from "./paths.js";

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

/** Copy `templates/global` into `globalDir` but not the raw `skills/` tree (skills are installed as `daf-*.md` via manifest). */
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
  platform: Platform;
};

export type InstallGlobalAgentResult = {
  globalDir: string;
  cursorSkillsRoot?: string;
};

/** Copy templates/global (incl. scaffold/), stacks, optional root-AGENTS pointer; optional Cursor platform + skills. */
export async function installGlobalAgent(opts: InstallGlobalAgentOpts): Promise<InstallGlobalAgentResult> {
  const templates = getTemplatesRoot();
  const globalDir = getGlobalAgentDir();
  const globalTpl = join(templates, "global");
  const stacksTpl = join(templates, "stacks");
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
  let cursorSkillsRoot: string | undefined;
  if (opts.platform === "cursor") {
    const cursorProjTpl = join(templates, "platforms", "cursor", "project");
    if (existsSync(cursorProjTpl)) {
      const cursorProjDest = join(globalDir, "platforms", "cursor", "project");
      await mkdir(cursorProjDest, { recursive: true });
      await copyDirMerge(cursorProjTpl, cursorProjDest, opts.force);
    }
    cursorSkillsRoot = getCursorSkillsRoot();
    await installCursorGlobalSkills({ templatesRoot: templates, skillsRoot: cursorSkillsRoot, force: opts.force });
  }
  return { globalDir, cursorSkillsRoot };
}
