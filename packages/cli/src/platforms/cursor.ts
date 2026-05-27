import { existsSync } from "node:fs";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

export type SkillManifestEntry = {
  name: string;
  description: string;
};

export type SkillManifest = Record<string, SkillManifestEntry>;

/** Strip leading `# Skill: /…` title line from global skill markdown. */
export function stripSkillTitle(markdown: string): string {
  const lines = markdown.split("\n");
  const first = lines[0]?.trim() ?? "";
  if (/^# Skill:\s*\//.test(first)) {
    return lines.slice(1).join("\n").replace(/^\n+/, "");
  }
  return markdown;
}

export function buildSkillMdBody(manifestEntry: SkillManifestEntry, bodyAfterTitle: string): string {
  const desc = JSON.stringify(manifestEntry.description);
  const fm = [
    "---",
    `name: ${manifestEntry.name}`,
    `description: ${desc}`,
    "disable-model-invocation: true",
    "---",
    "",
    bodyAfterTitle.trimStart(),
  ].join("\n");
  return fm.endsWith("\n") ? fm : `${fm}\n`;
}

export async function loadSkillManifest(templatesRoot: string): Promise<SkillManifest> {
  const path = join(templatesRoot, "global", "skill-manifest.json");
  const raw = await readFile(path, "utf8");
  const data = JSON.parse(raw) as unknown;
  if (typeof data !== "object" || data === null) {
    throw new Error("skill-manifest.json must be a JSON object");
  }
  return data as SkillManifest;
}

/** Install `~/.config/agent/skills/daf-*.md` from manifest (same names as Cursor skill folders). Skips copying raw `*.md` from the template tree. */
export async function installFlatMarkdownSkills(opts: {
  templatesRoot: string;
  globalSkillsDir: string;
  force: boolean;
}): Promise<void> {
  const manifest = await loadSkillManifest(opts.templatesRoot);
  const skillsTpl = join(opts.templatesRoot, "global", "skills");
  await mkdir(opts.globalSkillsDir, { recursive: true });

  for (const [id, entry] of Object.entries(manifest)) {
    const legacyPath = join(opts.globalSkillsDir, `${id}.md`);
    if (opts.force && existsSync(legacyPath)) {
      await unlink(legacyPath);
    }
    const src = join(skillsTpl, `${id}.md`);
    if (!existsSync(src)) {
      throw new Error(`Missing global skill template for manifest key "${id}": ${src}`);
    }
    const raw = await readFile(src, "utf8");
    const outFile = join(opts.globalSkillsDir, `${entry.name}.md`);
    if (!opts.force && existsSync(outFile)) {
      continue;
    }
    await writeFile(outFile, raw, "utf8");
  }
}

export async function installCursorGlobalSkills(opts: {
  templatesRoot: string;
  skillsRoot: string;
  force: boolean;
}): Promise<void> {
  const { installManifestSkillsAsSkillMd } = await import("./install-skills.js");
  await installManifestSkillsAsSkillMd(opts);
}
