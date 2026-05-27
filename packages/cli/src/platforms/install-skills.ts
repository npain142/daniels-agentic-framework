import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

import {
  buildSkillMdBody,
  loadSkillManifest,
  stripSkillTitle,
  type SkillManifest,
} from "./cursor.js";

export async function installManifestSkillsAsSkillMd(opts: {
  templatesRoot: string;
  skillsRoot: string;
  force: boolean;
}): Promise<void> {
  const manifest = await loadSkillManifest(opts.templatesRoot);
  const skillsTpl = join(opts.templatesRoot, "global", "skills");
  await mkdir(opts.skillsRoot, { recursive: true });

  for (const [id, entry] of Object.entries(manifest)) {
    const src = join(skillsTpl, `${id}.md`);
    if (!existsSync(src)) {
      throw new Error(`Missing global skill template for manifest key "${id}": ${src}`);
    }
    const raw = await readFile(src, "utf8");
    const body = stripSkillTitle(raw);
    const outFile = join(opts.skillsRoot, entry.name, "SKILL.md");
    if (!opts.force && existsSync(outFile)) {
      continue;
    }
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, buildSkillMdBody(entry, body), "utf8");
  }
}

export { type SkillManifest };
