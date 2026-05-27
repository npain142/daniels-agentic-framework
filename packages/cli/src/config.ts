import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export type Phase = "planning" | "developing" | "maintaining";

export type DafConfig = {
  phase: Phase;
  stack: string | null;
  check: string;
  /** Fast verification loop after each goal; defaults to `check` when omitted in JSON. */
  taskCheck: string;
  /** Modulo interval: codebase-check when `taskCount % codebaseEvery === 0` (see verify-state). */
  codebaseEvery: number;
  /** Used when `/daf-setup` creates `verify-state.json` → `taskCount`. */
  initialTaskCount: number;
  /** Protected branch name for **maintaining** branch guard; omit to infer from `origin/HEAD` or `main`. */
  defaultBranch?: string;
};

function parsePositiveInt(value: unknown, field: string, defaultVal: number): number {
  if (value === undefined) return defaultVal;
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new Error(`${field} must be a positive integer`);
  }
  return value;
}

function parseNonNegativeInt(value: unknown, field: string, defaultVal: number): number {
  if (value === undefined) return defaultVal;
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    throw new Error(`${field} must be a non-negative integer`);
  }
  return value;
}

export function parseConfig(raw: string): DafConfig {
  const data = JSON.parse(raw) as unknown;
  if (typeof data !== "object" || data === null) {
    throw new Error("config.json must be a JSON object");
  }
  const o = data as Record<string, unknown>;
  const phase = o.phase;
  const stack = o.stack;
  const check = o.check;
  if (o.platform !== undefined) {
    throw new Error(
      'config.json must not contain "platform" (machine-local). Use .agent/local.json with "platforms": ["cursor"] — see /daf-setup.',
    );
  }
  if (phase !== "planning" && phase !== "developing" && phase !== "maintaining") {
    throw new Error('config.phase must be "planning", "developing", or "maintaining"');
  }
  if (stack !== null && typeof stack !== "string") {
    throw new Error("config.stack must be a string or null");
  }
  if (typeof check !== "string" || check.trim() === "") {
    throw new Error('config.check must be a non-empty string');
  }
  const taskCheckRaw = o.taskCheck;
  const taskCheck =
    typeof taskCheckRaw === "string" && taskCheckRaw.trim() !== ""
      ? taskCheckRaw.trim()
      : check.trim();

  const codebaseEvery = parsePositiveInt(o.codebaseEvery, "config.codebaseEvery", 5);
  const initialTaskCount = parseNonNegativeInt(o.initialTaskCount, "config.initialTaskCount", 0);

  const base: DafConfig = {
    phase,
    stack: stack === null ? null : stack,
    check: check.trim(),
    taskCheck,
    codebaseEvery,
    initialTaskCount,
  };
  const defaultBranchRaw = o.defaultBranch;
  if (defaultBranchRaw !== undefined) {
    if (typeof defaultBranchRaw !== "string" || defaultBranchRaw.trim() === "") {
      throw new Error("config.defaultBranch must be a non-empty string when present");
    }
    base.defaultBranch = defaultBranchRaw.trim();
  }

  return base;
}

export async function readProjectConfig(agentDir: string): Promise<DafConfig> {
  const raw = await readFile(join(agentDir, "config.json"), "utf8");
  return parseConfig(raw);
}

export async function writeProjectConfig(agentDir: string, config: DafConfig): Promise<void> {
  const body = `${JSON.stringify(config, null, 2)}\n`;
  await writeFile(join(agentDir, "config.json"), body, "utf8");
}
