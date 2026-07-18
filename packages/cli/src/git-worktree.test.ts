import { execSync } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import {
  isDafMonorepo,
  resolveDafRepoForVersionCheck,
  resolveGitTopLevel,
} from "./daf-version.js";

describe("resolveGitTopLevel", () => {
  it("returns git root inside a repo", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-wt-root-"));
    try {
      execSync("git init", { cwd: root, stdio: "ignore" });
      await writeFile(join(root, "tracked.txt"), "x", "utf8");
      execSync("git add tracked.txt", { cwd: root, stdio: "ignore" });
      execSync('git -c user.email=t@e.com -c user.name=t commit -m init', {
        cwd: root,
        stdio: "ignore",
      });
      const nested = join(root, "nested", "deep");
      await import("node:fs/promises").then((fs) => fs.mkdir(nested, { recursive: true }));
      expect(resolveGitTopLevel(nested)).toBe(root);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("returns null outside a repo", async () => {
    const dir = await mkdtemp(join(tmpdir(), "daf-wt-nogit-"));
    try {
      expect(resolveGitTopLevel(dir)).toBeNull();
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});

describe("isDafMonorepo", () => {
  it("detects DAF marker path", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-wt-mono-"));
    try {
      const markerDir = join(root, "templates", "global");
      await import("node:fs/promises").then((fs) => fs.mkdir(markerDir, { recursive: true }));
      await writeFile(join(markerDir, "skill-manifest.json"), "{}", "utf8");
      expect(isDafMonorepo(root)).toBe(true);
      expect(isDafMonorepo(join(root, "other"))).toBe(false);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});

describe("resolveDafRepoForVersionCheck", () => {
  it("prefers env override", () => {
    expect(
      resolveDafRepoForVersionCheck({
        cwd: "/any",
        envRepo: "/env/repo",
        fileRepo: "/file/repo",
      }),
    ).toBe("/env/repo");
  });

  it("prefers cwd DAF worktree over daf-repo file", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-wt-prefer-"));
    try {
      execSync("git init", { cwd: root, stdio: "ignore" });
      const markerDir = join(root, "templates", "global");
      await import("node:fs/promises").then((fs) => fs.mkdir(markerDir, { recursive: true }));
      await writeFile(join(markerDir, "skill-manifest.json"), "{}", "utf8");
      await writeFile(join(root, "tracked.txt"), "x", "utf8");
      execSync("git add .", { cwd: root, stdio: "ignore" });
      execSync('git -c user.email=t@e.com -c user.name=t commit -m init', {
        cwd: root,
        stdio: "ignore",
      });
      expect(
        resolveDafRepoForVersionCheck({
          cwd: root,
          fileRepo: "/stale/other-clone",
        }),
      ).toBe(root);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("falls back to daf-repo file", () => {
    expect(
      resolveDafRepoForVersionCheck({
        cwd: tmpdir(),
        fileRepo: "/home/user/daf",
      }),
    ).toBe("/home/user/daf");
  });
});
