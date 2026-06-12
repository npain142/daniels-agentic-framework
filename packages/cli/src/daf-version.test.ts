import { mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import {
  checkDafVersion,
  formatStatusLine,
  normalizePin,
  readDafRepoPath,
  resolveDafRepoRoot,
  writeDafRepoPath,
} from "./daf-version.js";

const A = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const B = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
const C = "cccccccccccccccccccccccccccccccccccccccc";

describe("normalizePin", () => {
  it("accepts a 40-char SHA", () => {
    expect(normalizePin(`${A}\n`)).toBe(A);
  });

  it("rejects invalid pins", () => {
    expect(normalizePin("short")).toBeNull();
    expect(normalizePin("")).toBeNull();
  });
});

describe("checkDafVersion", () => {
  it("returns ok when pins match and global matches repo", () => {
    expect(checkDafVersion({ globalPin: A, projectPin: A, repoHead: A })).toBe("ok");
  });

  it("returns global-stale when repo head differs", () => {
    expect(checkDafVersion({ globalPin: A, projectPin: A, repoHead: B })).toBe("global-stale");
  });

  it("returns project-stale when project pin differs from global", () => {
    expect(checkDafVersion({ globalPin: B, projectPin: A, repoHead: B })).toBe("project-stale");
  });

  it("returns project-stale when project pin is missing", () => {
    expect(checkDafVersion({ globalPin: A, projectPin: null, repoHead: A })).toBe("project-stale");
  });

  it("returns both-stale when global lags repo and project lags global", () => {
    expect(checkDafVersion({ globalPin: A, projectPin: A, repoHead: C })).toBe("global-stale");
    expect(checkDafVersion({ globalPin: A, projectPin: B, repoHead: C })).toBe("both-stale");
  });

  it("ignores repo head when not provided", () => {
    expect(checkDafVersion({ globalPin: A, projectPin: A })).toBe("ok");
    expect(checkDafVersion({ globalPin: B, projectPin: A })).toBe("project-stale");
  });
});

describe("formatStatusLine", () => {
  it("prints a single status token", () => {
    expect(formatStatusLine("ok")).toBe("ok");
    expect(formatStatusLine("project-stale")).toBe("project-stale");
  });
});

describe("daf-repo path", () => {
  it("reads and writes daf-repo under global dir", async () => {
    const dir = await mkdtemp(join(tmpdir(), "daf-repo-"));
    await writeDafRepoPath(dir, "/home/user/daf");
    expect(await readDafRepoPath(dir)).toBe("/home/user/daf");
  });

  it("resolveDafRepoRoot prefers env override", async () => {
    const dir = await mkdtemp(join(tmpdir(), "daf-repo-env-"));
    await writeFile(join(dir, "daf-repo"), "/from/file\n", "utf8");
    expect(await resolveDafRepoRoot(dir, "/from/env")).toBe("/from/env");
    expect(await resolveDafRepoRoot(dir)).toBe("/from/file");
  });
});
