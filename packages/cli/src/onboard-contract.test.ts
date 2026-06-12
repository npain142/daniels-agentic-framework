import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getRepoRoot } from "./paths.js";

describe("onboard UX contract (templates)", () => {
  it("README quickstart is agent-first (/daf-onboard only)", async () => {
    const readme = await readFile(join(getRepoRoot(), "README.md"), "utf8");
    expect(readme).toContain("/daf-onboard");
    expect(readme).not.toMatch(/^```bash\nnpm install/m);
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

  it("onboard skill tells agent to run npm install/build, not the user", async () => {
    const skill = await readFile(
      join(getRepoRoot(), "templates/global/skills/onboard.md"),
      "utf8",
    );
    expect(skill).toContain("you run all shell steps");
    expect(skill).toContain("never** ask the user to run `npm install`");
    expect(skill).toContain("npm run build");
  });
});
