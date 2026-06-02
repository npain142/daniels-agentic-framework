import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import type { DafConfig } from "../config.js";
import { validateKgBootstrap, validatePlanningExit } from "./planning-to-developing.js";

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
  await writeFile(
    join(agentDir, "graphify.config.json"),
    JSON.stringify({ outputDir: "graphify-out", bootstrap: { sources: ["PRD.md"], minDomainNodes: 1 }, ingest: {} }),
    "utf8",
  );
  await writeFile(
    join(agentDir, "kg-bootstrap.json"),
    JSON.stringify({
      status: "ok",
      command: "npm run kg:bootstrap -- --write-receipt",
      sources: ["PRD.md", "GLOSSARY.md", "ARCHITECTURE.md"],
    }),
    "utf8",
  );
}

const validPrd = `# PRD

## Goal

Ship a minimal CLI that scaffolds planning and validates phase transitions.

## Non-goals

Personas, maintaining phase, JSON schema for config, Slack ingestion, and running LLM calls inside the CLI.

## v1 scope

Skills-only install: /daf-onboard + global-install script. Templates: global (incl. scaffold), stacks, platforms/cursor. /daf-setup bootstraps per-repo .agent/.

## Success

From an empty directory: run /daf-onboard, /daf-setup, complete PRD and docs, set config.stack, /daf-phase-transition to developing succeeds; npm run check passes in the framework repo.
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

  it("fails when kg-bootstrap.json is missing or incomplete", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-test-"));
    const agentDir = join(root, ".agent");
    const globalDir = join(root, "global");
    await mkdir(agentDir, { recursive: true });
    await mkdir(join(globalDir, "stacks"), { recursive: true });
    await agentFixture(agentDir, validPrd);
    await writeFile(join(globalDir, "stacks", "typescript.md"), "# ts\n", "utf8");
    await writeFile(join(agentDir, "kg-bootstrap.json"), JSON.stringify({ status: "incomplete" }), "utf8");
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
    if (!r.ok) expect(r.errors.some((e) => e.includes("kg-bootstrap"))).toBe(true);
  });

  it("validateKgBootstrap passes for a valid receipt", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-test-"));
    const path = join(root, "kg-bootstrap.json");
    await writeFile(
      path,
      JSON.stringify({
        status: "ok",
        command: "graphify + npm run kg:bootstrap",
        sources: ["PRD.md", "GLOSSARY.md", "ARCHITECTURE.md"],
      }),
      "utf8",
    );
    expect(await validateKgBootstrap(path)).toEqual({ ok: true });
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
