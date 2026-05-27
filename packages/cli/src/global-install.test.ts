import { mkdtemp, readFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it, afterEach } from "vitest";
import { existsSync } from "node:fs";
import { parseConfig } from "./config.js";
import { installGlobalAgent } from "./global-install.js";

describe("installGlobalAgent", () => {
  afterEach(() => {
    delete process.env.DAFE_GLOBAL_ROOT;
    delete process.env.DAF_CURSOR_SKILLS_ROOT;
  });

  it("installs scaffold and root-AGENTS pointer under global dir", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-global-"));
    process.env.DAFE_GLOBAL_ROOT = root;
    const { globalDir } = await installGlobalAgent({ force: true, platforms: ["generic"] });
    expect(globalDir).toBe(root);
    expect(existsSync(join(root, "scaffold", "config.json"))).toBe(true);
    const cfg = await readFile(join(root, "scaffold", "config.json"), "utf8");
    expect(cfg).toContain('"phase": "planning"');
    expect(() => parseConfig(cfg)).not.toThrow();
    const ptr = await readFile(join(root, "root-AGENTS.md"), "utf8");
    expect(ptr).toContain(".agent/AGENTS.md");
    expect(existsSync(join(root, "onboarding", "global-setup.md"))).toBe(true);
    const onboardSkill = await readFile(join(root, "skills", "daf-onboard.md"), "utf8");
    expect(onboardSkill).toContain("/daf-onboard");
    const setupSkill = await readFile(join(root, "skills", "daf-setup.md"), "utf8");
    expect(setupSkill).toContain("/daf-setup");
    expect(setupSkill).toContain("Project setup");
    expect(setupSkill).toContain("interview before populated structure");
    expect(setupSkill).toContain("not part of this skill");
    expect(existsSync(join(root, "skills", "setup.md"))).toBe(false);
    expect(existsSync(join(root, "root-BACKLOG.md"))).toBe(true);
    expect(existsSync(join(root, "root-LOGBACK.md"))).toBe(true);
  });

  it("with cursor platform installs Cursor project template under global dir", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-global-cursor-"));
    process.env.DAFE_GLOBAL_ROOT = root;
    process.env.DAF_CURSOR_SKILLS_ROOT = join(root, "cursor-skills");
    await installGlobalAgent({ force: true, platforms: ["cursor"] });
    const rule = await readFile(join(root, "platforms", "cursor", "project", ".cursor", "rules", "daf.mdc"), "utf8");
    expect(rule).toContain("alwaysApply: true");
    delete process.env.DAF_CURSOR_SKILLS_ROOT;
  });
});
