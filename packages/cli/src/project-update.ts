import { cp, mkdir, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";

import type { Platform } from "./platform.js";
import { DAF_PIN_FILENAME, readPin, writePin } from "./daf-version.js";
import { applyProjectOverlays } from "./project-overlays.js";

const SCAFFOLD_SKIP_FILES = new Set(["config.json", DAF_PIN_FILENAME]);

async function copyDirMergeSkip(
  src: string,
  dest: string,
  force: boolean,
  skipFiles: Set<string>,
): Promise<void> {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const ent of entries) {
    const from = join(src, ent.name);
    const to = join(dest, ent.name);
    if (ent.isDirectory()) {
      await copyDirMergeSkip(from, to, force, skipFiles);
    } else if (!skipFiles.has(ent.name) && (!existsSync(to) || force)) {
      await mkdir(dirname(to), { recursive: true });
      await cp(from, to);
    }
  }
}

export type RefreshProjectDafOpts = {
  repoRoot: string;
  globalDir: string;
  platforms: Platform[];
  /** Overwrite scaffold-shaped files (never `config.json` or `daf-pin`). */
  force: boolean;
};

export type RefreshProjectDafResult = {
  appliedPlatforms: string[];
  pin: string;
};

/** Re-apply overlays and scaffold merge; refresh `.agent/daf-pin` from global. */
export async function refreshProjectDaf(opts: RefreshProjectDafOpts): Promise<RefreshProjectDafResult> {
  const globalPin = await readPin(opts.globalDir);
  if (!globalPin) {
    throw new Error("Missing global daf-pin — run /daf-onboard from an updated DAF repo first");
  }

  const appliedPlatforms = await applyProjectOverlays({
    repoRoot: opts.repoRoot,
    globalDir: opts.globalDir,
    platforms: opts.platforms,
    force: true,
  });

  const scaffoldSrc = join(opts.globalDir, "scaffold");
  const agentDir = join(opts.repoRoot, ".agent");
  if (existsSync(scaffoldSrc)) {
    await copyDirMergeSkip(scaffoldSrc, agentDir, opts.force, SCAFFOLD_SKIP_FILES);
  }

  await writePin(agentDir, globalPin);

  return { appliedPlatforms, pin: globalPin };
}
