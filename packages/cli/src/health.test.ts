import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { collectHealthReport, formatHealthReport } from "./health.js";

describe("health", () => {
  let globalRoot: string;
  let projectRoot: string;
  let prevGlobal: string | undefined;

  beforeEach(async () => {
    globalRoot = await mkdtemp(join(tmpdir(), "daf-health-global-"));
    projectRoot = await mkdtemp(join(tmpdir(), "daf-health-project-"));
    prevGlobal = process.env.DAFE_GLOBAL_ROOT;
    process.env.DAFE_GLOBAL_ROOT = globalRoot;
  });

  afterEach(() => {
    if (prevGlobal === undefined) delete process.env.DAFE_GLOBAL_ROOT;
    else process.env.DAFE_GLOBAL_ROOT = prevGlobal;
  });

  it("reports missing globals and project", async () => {
    const report = await collectHealthReport(projectRoot);
    expect(report.globals.present).toBe(false);
    expect(report.project.present).toBe(false);
    expect(report.hints.some((h) => h.includes("daf onboard"))).toBe(true);
    expect(formatHealthReport(report)).toContain("DAF health");
  });

  it("reports phase and task count when project exists", async () => {
    await mkdir(join(globalRoot, "scaffold"), { recursive: true });
    await writeFile(join(globalRoot, "scaffold", "config.json"), "{}", "utf8");
    await writeFile(join(globalRoot, "platforms.json"), '{"platforms":["generic"]}\n', "utf8");

    const agentDir = join(projectRoot, ".agent");
    await mkdir(agentDir, { recursive: true });
    await writeFile(
      join(agentDir, "config.json"),
      JSON.stringify(
        {
          phase: "developing",
          stack: "typescript",
          check: "npm test",
          taskCheck: "npm test",
          codebaseEvery: 5,
          initialTaskCount: 0,
        },
        null,
        2,
      ),
      "utf8",
    );
    await writeFile(
      join(agentDir, "verify-state.json"),
      JSON.stringify({ taskCount: 4, codebaseCheckPending: false, lastCodebaseSnapshotAt: null }),
      "utf8",
    );

    const report = await collectHealthReport(projectRoot);
    expect(report.project.config?.phase).toBe("developing");
    expect(report.project.verifyState?.taskCount).toBe(4);
    expect(report.globals.present).toBe(true);
  });
});
