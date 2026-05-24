import { describe, expect, it } from "vitest";
import { buildInitialVerifyState } from "./verify-state.js";

describe("buildInitialVerifyState", () => {
  it("starts at zero with no pending", () => {
    expect(buildInitialVerifyState(0, 5)).toEqual({
      taskCount: 0,
      codebaseCheckPending: false,
      lastCodebaseSnapshotAt: null,
    });
  });

  it("sets pending when seed is positive multiple of interval", () => {
    expect(buildInitialVerifyState(10, 5).codebaseCheckPending).toBe(true);
    expect(buildInitialVerifyState(10, 5).taskCount).toBe(10);
  });

  it("does not set pending when seed is not a multiple", () => {
    expect(buildInitialVerifyState(12, 5).codebaseCheckPending).toBe(false);
  });

  it("does not set pending for seed zero", () => {
    expect(buildInitialVerifyState(0, 5).codebaseCheckPending).toBe(false);
  });
});
