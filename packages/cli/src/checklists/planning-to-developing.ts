import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { DafConfig } from "../config.js";
import { getTemplatesRoot } from "../paths.js";

export type ChecklistResult = { ok: true } | { ok: false; errors: string[] };

const MIN_PRD = 400;
const MIN_GLOSSARY = 80;
const MIN_ARCH = 120;

function hasRealSection(body: string, heading: string): boolean {
  const idx = body.indexOf(heading);
  if (idx === -1) return false;
  const after = body.slice(idx + heading.length);
  const next = after.search(/^## /m);
  const section = next === -1 ? after : after.slice(0, next);
  const text = section.replace(/[_*`#-]/g, "").trim();
  if (text.length < 20) return false;
  if (/^TBD$/im.test(text)) return false;
  if (text.toLowerCase().includes("tbd")) return false;
  return true;
}

/**
 * Validates planning exit criteria before leaving `planning` for `developing` or `maintaining`.
 * Checklist thresholds must stay aligned with `templates/global/skills/daf-phase-transition.md` (/daf-phase-transition).
 */
export async function validatePlanningExit(
  agentDir: string,
  globalAgentDir: string,
  config: DafConfig,
): Promise<ChecklistResult> {
  const errors: string[] = [];

  const prdPath = join(agentDir, "PRD.md");
  const glossaryPath = join(agentDir, "GLOSSARY.md");
  const archPath = join(agentDir, "ARCHITECTURE.md");
  const planningPhase = join(agentDir, "phases", "planning.md");
  const developingPhase = join(agentDir, "phases", "developing.md");
  const maintainingPhase = join(agentDir, "phases", "maintaining.md");

  for (const [label, p] of [
    ["PRD.md", prdPath],
    ["GLOSSARY.md", glossaryPath],
    ["ARCHITECTURE.md", archPath],
    ["phases/planning.md", planningPhase],
    ["phases/developing.md", developingPhase],
    ["phases/maintaining.md", maintainingPhase],
  ] as const) {
    if (!existsSync(p)) errors.push(`Missing ${label} (${p})`);
  }

  if (errors.length) return { ok: false, errors };

  const prd = await readFile(prdPath, "utf8");
  const glossary = await readFile(glossaryPath, "utf8");
  const arch = await readFile(archPath, "utf8");

  if (prd.trim().length < MIN_PRD) {
    errors.push(`PRD.md is too short (min ${MIN_PRD} chars)`);
  }
  for (const h of ["## Goal", "## Non-goals", "## v1 scope", "## Success"] as const) {
    if (!hasRealSection(prd, h)) {
      errors.push(`PRD.md must contain a filled section: ${h}`);
    }
  }

  if (glossary.trim().length < MIN_GLOSSARY) {
    errors.push(`GLOSSARY.md is too short (min ${MIN_GLOSSARY} chars)`);
  }
  if (arch.trim().length < MIN_ARCH) {
    errors.push(`ARCHITECTURE.md is too short (min ${MIN_ARCH} chars)`);
  }

  if (config.stack == null || config.stack === "") {
    errors.push("config.stack is null — set stack in .agent/config.json after /daf-grill-me");
  } else {
    const stackFileGlobal = join(globalAgentDir, "stacks", `${config.stack}.md`);
    const stackFileTpl = join(getTemplatesRoot(), "stacks", `${config.stack}.md`);
    if (!existsSync(stackFileGlobal) && !existsSync(stackFileTpl)) {
      errors.push(
        `Stack file not found for "${config.stack}" (expected under ~/.config/agent/stacks/ or built-in templates/stacks/). Run \`/daf-onboard\`.`,
      );
    }
  }

  if (errors.length) return { ok: false, errors };
  return { ok: true };
}

/** @deprecated Use `validatePlanningExit` — alias kept for callers. */
export const validatePlanningToDeveloping = validatePlanningExit;
