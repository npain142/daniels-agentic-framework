import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getRepoRoot } from "./paths.js";

const repoRoot = getRepoRoot();

async function readTemplate(rel: string): Promise<string> {
  return readFile(join(repoRoot, rel), "utf8");
}

describe("maintaining phase v2 contract (templates)", () => {
  it("scaffold maintaining.md documents branch guard, defaultBranch, hotfix, check, and tests", async () => {
    const md = await readTemplate("templates/global/scaffold/phases/maintaining.md");
    expect(md).toContain("## Branch guard");
    expect(md).toContain("defaultBranch");
    expect(md).toContain("Hotfix exception");
    expect(md).toContain("config.check");
    expect(md).toContain("Failing automated test");
    expect(md).toContain("regression");
  });

  it("task skill includes maintaining When and Maintaining phase section", async () => {
    const md = await readTemplate("templates/global/skills/task.md");
    expect(md).toContain('`phase === "maintaining"`');
    expect(md).toContain("## Maintaining phase");
  });

  it("issue skill includes maintaining in When", async () => {
    const md = await readTemplate("templates/global/skills/issue.md");
    expect(md).toContain('`phase === "maintaining"`');
  });
});
