import { mkdtemp, readFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import { applyProjectOverlays } from "./project-overlays.js";
import { getTemplatesRoot } from "./paths.js";
import { installGlobalAgent } from "./global-install.js";
import { existsSync } from "node:fs";

describe("applyProjectOverlays", () => {
  it("merges cursor and claude project templates into repo root", async () => {
    const globalRoot = await mkdtemp(join(tmpdir(), "daf-ov-g-"));
    const repoRoot = await mkdtemp(join(tmpdir(), "daf-ov-r-"));
    process.env.DAFE_GLOBAL_ROOT = globalRoot;
    process.env.DAF_CURSOR_SKILLS_ROOT = join(globalRoot, "cursor-skills");
    process.env.DAF_CLAUDE_SKILLS_ROOT = join(globalRoot, "claude-skills");

    await installGlobalAgent({
      force: true,
      platforms: ["cursor", "claude"],
    });

    const applied = await applyProjectOverlays({
      repoRoot,
      globalDir: globalRoot,
      platforms: ["cursor", "claude"],
      force: true,
    });
    expect(applied.sort()).toEqual(["claude", "cursor"]);
    expect(existsSync(join(repoRoot, ".cursor", "rules", "daf.mdc"))).toBe(true);
    const claudeRule = await readFile(join(repoRoot, ".claude", "rules", "daf.md"), "utf8");
    expect(claudeRule).toContain("platforms.json");

    delete process.env.DAFE_GLOBAL_ROOT;
    delete process.env.DAF_CURSOR_SKILLS_ROOT;
    delete process.env.DAF_CLAUDE_SKILLS_ROOT;
  });
});

describe("installGlobalAgent multi-platform", () => {
  it("writes platforms.json and installs claude skills", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-multi-"));
    process.env.DAFE_GLOBAL_ROOT = root;
    process.env.DAF_CLAUDE_SKILLS_ROOT = join(root, "claude-skills");
    process.env.DAF_CODEX_HOME = join(root, "codex-home");

    const result = await installGlobalAgent({
      force: true,
      platforms: ["cursor", "claude", "codex"],
    });
    expect(result.platforms).toEqual(["cursor", "claude", "codex"]);
    const platformsRaw = await readFile(join(root, "platforms.json"), "utf8");
    expect(JSON.parse(platformsRaw).platforms).toEqual(["cursor", "claude", "codex"]);
    expect(existsSync(join(root, "claude-skills", "daf-setup", "SKILL.md"))).toBe(true);
    expect(existsSync(join(root, "platforms", "claude", "project", ".claude", "rules", "daf.md"))).toBe(
      true,
    );
    expect(existsSync(join(getTemplatesRoot(), "platforms", "codex", "global", "AGENTS.md"))).toBe(true);
    expect(existsSync(join(root, "codex-home", "AGENTS.md"))).toBe(true);

    delete process.env.DAFE_GLOBAL_ROOT;
    delete process.env.DAF_CLAUDE_SKILLS_ROOT;
    delete process.env.DAF_CODEX_HOME;
  });
});
