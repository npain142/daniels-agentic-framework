import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getRepoRoot } from "./paths.js";

describe("onboard UX contract (templates)", () => {
  it("README quickstart is agent-first (/onboard only)", async () => {
    const readme = await readFile(join(getRepoRoot(), "README.md"), "utf8");
    expect(readme).toContain("/onboard");
    expect(readme).not.toMatch(/^```bash\nnpm install/m);
    expect(readme).not.toContain("Optional verify:");
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
