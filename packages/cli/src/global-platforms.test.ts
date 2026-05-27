import { mkdtemp, readFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it, afterEach } from "vitest";
import {
  parseGlobalPlatforms,
  readGlobalPlatforms,
  writeGlobalPlatforms,
} from "./global-platforms.js";

describe("parseGlobalPlatforms", () => {
  it("parses and dedupes platforms", () => {
    expect(
      parseGlobalPlatforms(JSON.stringify({ platforms: ["cursor", "claude", "cursor"] })),
    ).toEqual({ platforms: ["cursor", "claude"] });
  });

  it("rejects unknown platform ids", () => {
    expect(() => parseGlobalPlatforms(JSON.stringify({ platforms: ["vscode"] }))).toThrow(
      /platforms\[0\]/,
    );
  });
});

describe("readGlobalPlatforms", () => {
  afterEach(() => {
    delete process.env.DAFE_GLOBAL_ROOT;
  });

  it("defaults to generic when file missing", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-gp-"));
    process.env.DAFE_GLOBAL_ROOT = root;
    await expect(readGlobalPlatforms()).resolves.toEqual({ platforms: ["generic"] });
  });

  it("round-trips write and read", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-gp-"));
    process.env.DAFE_GLOBAL_ROOT = root;
    await writeGlobalPlatforms(root, { platforms: ["cursor", "codex"] });
    const raw = await readFile(join(root, "platforms.json"), "utf8");
    expect(JSON.parse(raw).platforms).toEqual(["cursor", "codex"]);
    await expect(readGlobalPlatforms(root)).resolves.toEqual({
      platforms: ["cursor", "codex"],
    });
  });
});
