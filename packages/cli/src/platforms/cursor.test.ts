import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import { parsePlatform } from "../platform.js";
import { getTemplatesRoot } from "../paths.js";
import {
  buildSkillMdBody,
  installCursorGlobalSkills,
  loadSkillManifest,
  stripSkillTitle,
} from "./cursor.js";

describe("parsePlatform", () => {
  it("accepts generic and cursor", () => {
    expect(parsePlatform("generic")).toBe("generic");
    expect(parsePlatform("cursor")).toBe("cursor");
    expect(parsePlatform("CURSOR")).toBe("cursor");
  });
  it("accepts claude and codex", () => {
    expect(parsePlatform("claude")).toBe("claude");
    expect(parsePlatform("codex")).toBe("codex");
  });
  it("rejects unknown", () => {
    expect(() => parsePlatform("vscode")).toThrow(/Unknown platform/);
  });
});

describe("stripSkillTitle", () => {
  it("removes leading # Skill line", () => {
    const raw = "# Skill: /grill-me\n\n**When:** planning.\n";
    expect(stripSkillTitle(raw)).toBe("**When:** planning.\n");
  });
});

describe("buildSkillMdBody", () => {
  it("embeds quoted description and name", () => {
    const out = buildSkillMdBody(
      { name: "daf-test", description: 'Say "hi": then go' },
      "## Body\n",
    );
    expect(out).toContain("name: daf-test");
    expect(out).toContain("disable-model-invocation: true");
    expect(out).toContain("## Body");
    expect(out).toMatch(/^---\n/);
  });
});

describe("installCursorGlobalSkills", () => {
  it("writes all manifest skills under temp skills root", async () => {
    const skillsRoot = await mkdtemp(join(tmpdir(), "daf-cursor-skills-"));
    const templatesRoot = getTemplatesRoot();
    await installCursorGlobalSkills({ templatesRoot, skillsRoot, force: true });
    const manifest = await loadSkillManifest(templatesRoot);
    for (const entry of Object.values(manifest)) {
      const skillMd = await readFile(join(skillsRoot, entry.name, "SKILL.md"), "utf8");
      expect(skillMd).toContain(`name: ${entry.name}`);
      expect(skillMd).toContain(entry.description.slice(0, 40));
    }
  });

  it("skips existing files when force is false", async () => {
    const skillsRoot = await mkdtemp(join(tmpdir(), "daf-cursor-skills-"));
    const templatesRoot = getTemplatesRoot();
    await installCursorGlobalSkills({ templatesRoot, skillsRoot, force: true });
    const manifest = await loadSkillManifest(templatesRoot);
    const first = Object.values(manifest)[0];
    const path = join(skillsRoot, first!.name, "SKILL.md");
    await writeFile(path, "stale", "utf8");
    await installCursorGlobalSkills({ templatesRoot, skillsRoot, force: false });
    expect(await readFile(path, "utf8")).toBe("stale");
  });
});
