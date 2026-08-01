import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getRepoRoot } from "./paths.js";

describe("onboard UX contract (templates)", () => {
  it("README quickstart documents install and /daf-onboard", async () => {
    const readme = await readFile(join(getRepoRoot(), "README.md"), "utf8");
    expect(readme).toContain("/daf-onboard");
    expect(readme).toMatch(/@daniels-agent-framework\/cli|daf onboard/);
    expect(readme).not.toContain("Optional verify:");
  });

  it("daf.mdc auto-prompts once per session when version check is not ok", async () => {
    const rule = await readFile(
      join(getRepoRoot(), "templates/platforms/cursor/project/.cursor/rules/daf.mdc"),
      "utf8",
    );
    expect(rule).toContain("daf-version-check.mjs");
    expect(rule).toContain("once per session");
    expect(rule).toContain("/daf-update");
    expect(rule).toContain("do not read `daf-pin`");
  });

  it("onboard skill prefers daf CLI; agent runs build in monorepo", async () => {
    const skill = await readFile(
      join(getRepoRoot(), "templates/global/skills/onboard.md"),
      "utf8",
    );
    expect(skill).toContain("npm install -g @daniels-agent-framework/cli");
    expect(skill).toContain("daf onboard");
    expect(skill).toContain("never ask the user to");
    expect(skill).toContain("npm run build");
  });
});
