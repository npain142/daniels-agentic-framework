import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { getRepoRoot } from "./paths.js";

describe("cli contract", () => {
  it("packages/cli exposes daf bin", async () => {
    const pkg = JSON.parse(
      await readFile(join(getRepoRoot(), "packages", "cli", "package.json"), "utf8"),
    ) as { bin?: Record<string, string> };
    expect(pkg.bin?.daf).toBe("./dist/cli.js");
  });

  it("health skill references daf health", async () => {
    const skill = await readFile(
      join(getRepoRoot(), "templates", "global", "skills", "health.md"),
      "utf8",
    );
    expect(skill).toContain("daf health");
    expect(skill).toContain("/daf-health");
  });

  it("grill-me is planning-only; realign is separate", async () => {
    const grill = await readFile(
      join(getRepoRoot(), "templates", "global", "skills", "grill-me.md"),
      "utf8",
    );
    const realign = await readFile(
      join(getRepoRoot(), "templates", "global", "skills", "realign.md"),
      "utf8",
    );
    expect(grill).toContain("**`planning` only**");
    expect(grill).toContain("/daf-realign");
    expect(realign).toContain("/daf-realign");
    expect(realign).not.toContain("assumption audit");
  });

  it("new-feature defaults to TDD", async () => {
    const skill = await readFile(
      join(getRepoRoot(), "templates", "global", "skills", "new-feature.md"),
      "utf8",
    );
    expect(skill).toContain("**TDD default:**");
    expect(skill).toContain("failing test first");
  });

  it("backlog template documents priority tags", async () => {
    const backlog = await readFile(
      join(getRepoRoot(), "templates", "root-BACKLOG.md"),
      "utf8",
    );
    expect(backlog).toContain("#p1");
    expect(backlog).toContain("#p2");
    expect(backlog).toContain("#p3");
  });
});
