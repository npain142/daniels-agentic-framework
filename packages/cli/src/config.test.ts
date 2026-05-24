import { describe, expect, it } from "vitest";
import { parseConfig } from "./config.js";

describe("parseConfig", () => {
  it("defaults taskCheck to check when taskCheck omitted", () => {
    const cfg = parseConfig(
      JSON.stringify({ phase: "planning", stack: null, check: "npm run check" }),
    );
    expect(cfg.taskCheck).toBe("npm run check");
    expect(cfg.codebaseEvery).toBe(5);
    expect(cfg.initialTaskCount).toBe(0);
  });

  it("accepts phase maintaining", () => {
    const cfg = parseConfig(
      JSON.stringify({
        phase: "maintaining",
        stack: "typescript",
        check: "npm run check",
      }),
    );
    expect(cfg.phase).toBe("maintaining");
    expect(cfg.defaultBranch).toBeUndefined();
  });

  it("accepts optional defaultBranch", () => {
    const cfg = parseConfig(
      JSON.stringify({
        phase: "maintaining",
        stack: "typescript",
        check: "npm run check",
        defaultBranch: "main",
      }),
    );
    expect(cfg.defaultBranch).toBe("main");
  });

  it("rejects empty defaultBranch", () => {
    expect(() =>
      parseConfig(
        JSON.stringify({
          phase: "developing",
          stack: "typescript",
          check: "x",
          defaultBranch: "  ",
        }),
      ),
    ).toThrow(/defaultBranch/);
  });

  it("rejects non-string defaultBranch", () => {
    expect(() =>
      parseConfig(
        JSON.stringify({
          phase: "developing",
          stack: "typescript",
          check: "x",
          defaultBranch: 1,
        }),
      ),
    ).toThrow(/defaultBranch/);
  });

  it("accepts taskCheck codebaseEvery initialTaskCount", () => {
    const cfg = parseConfig(
      JSON.stringify({
        phase: "developing",
        stack: "typescript",
        check: "npm run check",
        taskCheck: "npm run test",
        codebaseEvery: 3,
        initialTaskCount: 2,
      }),
    );
    expect(cfg.taskCheck).toBe("npm run test");
    expect(cfg.codebaseEvery).toBe(3);
    expect(cfg.initialTaskCount).toBe(2);
  });

  it("rejects non-positive codebaseEvery", () => {
    expect(() =>
      parseConfig(
        JSON.stringify({
          phase: "planning",
          stack: null,
          check: "x",
          codebaseEvery: 0,
        }),
      ),
    ).toThrow(/codebaseEvery/);
  });

  it("rejects negative initialTaskCount", () => {
    expect(() =>
      parseConfig(
        JSON.stringify({
          phase: "planning",
          stack: null,
          check: "x",
          initialTaskCount: -1,
        }),
      ),
    ).toThrow(/initialTaskCount/);
  });
});
