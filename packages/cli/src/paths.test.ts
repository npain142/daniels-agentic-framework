import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  getCliPackageRoot,
  getRepoRoot,
  getTemplatesRoot,
  resolveMonorepoRoot,
} from "./paths.js";

describe("paths (standalone package)", () => {
  it("finds monorepo templates when developing DAF", () => {
    expect(resolveMonorepoRoot()).not.toBeNull();
    expect(getTemplatesRoot()).toContain("templates");
  });

  it("uses bundled templates after build", () => {
    const bundled = join(getCliPackageRoot(), "bundled-templates", "global", "skill-manifest.json");
    expect(existsSync(bundled)).toBe(true);
  });

  it("getRepoRoot resolves to monorepo or package root", () => {
    const root = getRepoRoot();
    expect(root.length).toBeGreaterThan(0);
    expect(
      existsSync(join(root, "templates", "global", "skill-manifest.json")) ||
        existsSync(join(root, "bundled-templates", "global", "skill-manifest.json")),
    ).toBe(true);
  });
});
