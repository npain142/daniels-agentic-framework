import { existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { readProjectConfig, type DafConfig } from "./config.js";
import {
  checkDafVersion,
  readPin,
  resolveDafRepoForVersionCheck,
  resolveDafRepoRoot,
  resolveRepoHead,
  type DafVersionStatus,
} from "./daf-version.js";
import { readGlobalPlatforms } from "./global-platforms.js";
import { findAgentDir, getGlobalAgentDir } from "./paths.js";
import type { VerifyState } from "./verify-state.js";

export type HealthReport = {
  cwd: string;
  globals: {
    present: boolean;
    dir: string;
    platforms: string[];
  };
  project: {
    present: boolean;
    agentDir: string | null;
    config: DafConfig | null;
    verifyState: VerifyState | null;
  };
  version: DafVersionStatus;
  kg: {
    present: boolean;
    graphPath: string | null;
    lastModified: string | null;
    needsUpdateFlag: boolean;
  };
  hints: string[];
};

function resolveGraphPaths(cwd: string, agentDir: string | null): {
  graphPath: string | null;
  needsUpdateFlag: boolean;
} {
  const roots = agentDir ? [join(agentDir, "..")] : [cwd];
  for (const root of roots) {
    const graphPath = join(root, "graphify-out", "graph.json");
    if (existsSync(graphPath)) {
      return {
        graphPath,
        needsUpdateFlag: existsSync(join(root, "graphify-out", "needs_update")),
      };
    }
  }
  return { graphPath: null, needsUpdateFlag: false };
}

export async function collectHealthReport(cwd: string): Promise<HealthReport> {
  const globalDir = getGlobalAgentDir();
  const globalsPresent = existsSync(join(globalDir, "scaffold", "config.json"));
  const platforms = globalsPresent ? (await readGlobalPlatforms(globalDir)).platforms : [];

  const agentDir = findAgentDir(cwd);
  let config: DafConfig | null = null;
  let verifyState: VerifyState | null = null;

  if (agentDir) {
    try {
      config = await readProjectConfig(agentDir);
    } catch {
      config = null;
    }
    try {
      const raw = await readFile(join(agentDir, "verify-state.json"), "utf8");
      verifyState = JSON.parse(raw) as VerifyState;
    } catch {
      verifyState = null;
    }
  }

  const fileRepo = globalsPresent ? await resolveDafRepoRoot(globalDir) : null;
  const repoRoot = resolveDafRepoForVersionCheck({
    cwd,
    envRepo: process.env.DAF_REPO,
    fileRepo,
  });
  const globalPin = globalsPresent ? await readPin(globalDir) : null;
  const projectPin = agentDir ? await readPin(agentDir) : null;
  const repoHead = repoRoot ? resolveRepoHead(repoRoot) : null;
  const version = checkDafVersion({ globalPin, projectPin, repoHead });

  const { graphPath, needsUpdateFlag } = resolveGraphPaths(cwd, agentDir);
  const lastModified =
    graphPath !== null ? statSync(graphPath).mtime.toISOString().slice(0, 10) : null;

  const hints: string[] = [];
  if (!globalsPresent) hints.push("Run `daf onboard` or `/daf-onboard` in chat");
  if (version !== "ok") hints.push(`Templates stale (${version}) — run /daf-update`);
  if (agentDir && !config) hints.push(".agent/config.json missing or invalid");
  if (config && verifyState) {
    const next = verifyState.taskCount + 1;
    if (verifyState.codebaseCheckPending) {
      hints.push("Codebase-check owed from a prior session");
    } else if (config.phase !== "planning" && next > 0 && next % config.codebaseEvery === 0) {
      hints.push(`Codebase-check due at next task end (after task ${next})`);
    }
    if (config.phase === "maintaining") {
      hints.push("Maintaining: `config.check` required every session task end");
    }
  }
  if (needsUpdateFlag) hints.push("KG semantic ingest needed — run /daf-kg-ingest");
  if (!graphPath && config && config.phase !== "planning") {
    hints.push("No graphify-out/graph.json — planning exit may be incomplete");
  }
  if (!agentDir) hints.push("No .agent/ in tree — run /daf-setup in this repo");

  return {
    cwd,
    globals: { present: globalsPresent, dir: globalDir, platforms },
    project: { present: agentDir !== null, agentDir, config, verifyState },
    version,
    kg: { present: graphPath !== null, graphPath, lastModified, needsUpdateFlag },
    hints,
  };
}

export function formatHealthReport(report: HealthReport): string {
  const lines: string[] = ["DAF health", ""];

  lines.push(`Globals: ${report.globals.present ? "ok" : "missing"} (${report.globals.dir})`);
  if (report.globals.platforms.length > 0) {
    lines.push(`Platforms: ${report.globals.platforms.join(", ")}`);
  }
  lines.push(`Version: ${report.version}`);

  if (report.project.present && report.project.config) {
    const c = report.project.config;
    lines.push(`Phase: ${c.phase}`);
    lines.push(`Stack: ${c.stack ?? "(not set)"}`);
    if (report.project.verifyState) {
      const v = report.project.verifyState;
      lines.push(
        `Tasks: ${v.taskCount} (codebase-check pending: ${v.codebaseCheckPending ? "yes" : "no"})`,
      );
    }
  } else {
    lines.push("Project: no .agent/ found");
  }

  if (report.kg.present) {
    lines.push(`KG: present (updated ${report.kg.lastModified})`);
    if (report.kg.needsUpdateFlag) lines.push("KG: semantic update flag set");
  } else {
    lines.push("KG: absent");
  }

  if (report.hints.length > 0) {
    lines.push("");
    lines.push("Hints:");
    for (const h of report.hints) lines.push(`  • ${h}`);
  }

  return lines.join("\n");
}
