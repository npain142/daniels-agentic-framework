import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import type { DafConfig } from "../config.js";
import { validatePlanningExit } from "./planning-to-developing.js";

async function agentFixture(agentDir: string, prdBody: string): Promise<void> {
  await mkdir(join(agentDir, "phases"), { recursive: true });
  await mkdir(join(agentDir, "memory"), { recursive: true });
  await writeFile(join(agentDir, "phases", "planning.md"), "# p\n", "utf8");
  await writeFile(join(agentDir, "phases", "developing.md"), "# d\n", "utf8");
  await writeFile(join(agentDir, "phases", "maintaining.md"), "# m\n", "utf8");
  await writeFile(join(agentDir, "PRD.md"), prdBody, "utf8");
  await writeFile(
    join(agentDir, "GLOSSARY.md"),
    "# Glossary\n\n| Term | Definition |\n|------|------------|\n| Foo | Bar something extra for length. |\n",
    "utf8",
  );
  await writeFile(
    join(agentDir, "ARCHITECTURE.md"),
    "# Architecture\n\nModules and boundaries described here with enough characters to pass the minimum length gate for developing transition.",
    "utf8",
  );
}

const validPrd = `# PRD

## Goal

Ship a minimal CLI that scaffolds planning and validates phase transitions.

## Non-goals

Personas, maintaining phase, JSON schema for config, Slack ingestion, and running LLM calls inside the CLI.

## v1 scope

Skills-only install: /onboard + global-install script. Templates: global (incl. scaffold), stacks, platforms/cursor. /setup bootstraps per-repo .agent/.

## Success

From an empty directory: run /onboard, /setup, complete PRD and docs, set config.stack, /phase-transition to developing succeeds; npm run check passes in the framework repo.
`;

describe("validatePlanningExit", () => {
  it("passes when artifacts and stack are valid", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-test-"));
    const agentDir = join(root, ".agent");
    const globalDir = join(root, "global");
    await mkdir(agentDir, { recursive: true });
    await mkdir(join(globalDir, "stacks"), { recursive: true });
    await agentFixture(agentDir, validPrd);
    await writeFile(join(globalDir, "stacks", "typescript.md"), "# TypeScript stack\n", "utf8");
    const config: DafConfig = {
      phase: "planning",
      stack: "typescript",
      check: "npm run check",
      taskCheck: "npm run test",
      codebaseEvery: 5,
      initialTaskCount: 0,
    };
    const r = await validatePlanningExit(agentDir, globalDir, config);
    expect(r).toEqual({ ok: true });
  });

  it("fails when a PRD section still contains TBD-style placeholders", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-test-"));
    const agentDir = join(root, ".agent");
    const globalDir = join(root, "global");
    await mkdir(agentDir, { recursive: true });
    await mkdir(join(globalDir, "stacks"), { recursive: true });
    const badPrd = validPrd.replace(
      "## Non-goals\n\nPersonas",
      "## Non-goals\n\nTBD: figure out later. Personas",
    );
    await agentFixture(agentDir, badPrd);
    await writeFile(join(globalDir, "stacks", "typescript.md"), "# ts\n", "utf8");
    const config: DafConfig = {
      phase: "planning",
      stack: "typescript",
      check: "npm run check",
      taskCheck: "npm run test",
      codebaseEvery: 5,
      initialTaskCount: 0,
    };
    const r = await validatePlanningExit(agentDir, globalDir, config);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.some((e) => e.includes("PRD"))).toBe(true);
  });
});
