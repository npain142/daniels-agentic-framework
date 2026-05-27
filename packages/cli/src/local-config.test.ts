import { describe, expect, it } from "vitest";
import { defaultLocalConfig, parseLocalConfig } from "./local-config.js";

describe("parseLocalConfig", () => {
  it("defaults platforms to empty when omitted", () => {
    expect(parseLocalConfig("{}")).toEqual(defaultLocalConfig());
  });

  it("accepts one or more platforms and dedupes", () => {
    expect(parseLocalConfig(JSON.stringify({ platforms: ["cursor"] }))).toEqual({
      platforms: ["cursor"],
    });
    expect(
      parseLocalConfig(JSON.stringify({ platforms: ["cursor", "generic", "cursor"] })),
    ).toEqual({ platforms: ["cursor", "generic"] });
  });

  it("rejects invalid platform ids", () => {
    expect(() => parseLocalConfig(JSON.stringify({ platforms: ["vscode"] }))).toThrow(
      /platforms\[0\]/,
    );
  });

  it("rejects non-array platforms", () => {
    expect(() => parseLocalConfig(JSON.stringify({ platforms: "cursor" }))).toThrow(/array/);
  });
});
