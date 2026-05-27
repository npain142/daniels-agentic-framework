import { cp, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";

import type { Platform } from "./platform.js";
import { IDE_PLATFORMS } from "./platform.js";

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

export type ApplyProjectOverlaysOpts = {
  repoRoot: string;
  globalDir: string;
  platforms: Platform[];
  force: boolean;
};

/** Merge `$G/platforms/<id>/project/` into `repoRoot` for each IDE platform. */
export async function applyProjectOverlays(opts: ApplyProjectOverlaysOpts): Promise<string[]> {
  const applied: string[] = [];
  for (const id of opts.platforms) {
    if (!IDE_PLATFORMS.includes(id as (typeof IDE_PLATFORMS)[number])) continue;
    const src = join(opts.globalDir, "platforms", id, "project");
    if (!existsSync(src)) continue;
    await copyDirMerge(src, opts.repoRoot, opts.force);
    applied.push(id);
  }
  return applied;
}

export async function stashPlatformProjectTemplates(opts: {
  templatesRoot: string;
  globalDir: string;
  platforms: Platform[];
  force: boolean;
}): Promise<void> {
  for (const id of opts.platforms) {
    if (!IDE_PLATFORMS.includes(id as (typeof IDE_PLATFORMS)[number])) continue;
    const src = join(opts.templatesRoot, "platforms", id, "project");
    if (!existsSync(src)) continue;
    const dest = join(opts.globalDir, "platforms", id, "project");
    await mkdir(dest, { recursive: true });
    await copyDirMerge(src, dest, opts.force);
  }
}
