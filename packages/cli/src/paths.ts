import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { readPin, resolveRepoHead } from "./daf-version.js";

const MANIFEST_REL = join("global", "skill-manifest.json");

/** npm package root (`packages/cli` in monorepo, or global install dir). */
export function getCliPackageRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  // dist -> package root
  return join(here, "..");
}

/** DAF monorepo root when developing this repo; null when only the npm package is installed. */
export function resolveMonorepoRoot(): string | null {
  const root = join(getCliPackageRoot(), "..", "..");
  if (existsSync(join(root, "templates", MANIFEST_REL))) {
    return root;
  }
  return null;
}

/**
 * Monorepo root when present, else the installed CLI package root.
 */
export function getRepoRoot(): string {
  return resolveMonorepoRoot() ?? getCliPackageRoot();
}

export function getTemplatesRoot(): string {
  const monorepo = resolveMonorepoRoot();
  if (monorepo) {
    const monorepoTemplates = join(monorepo, "templates");
    if (existsSync(join(monorepoTemplates, MANIFEST_REL))) {
      return monorepoTemplates;
    }
  }
  const bundled = join(getCliPackageRoot(), "bundled-templates");
  if (existsSync(join(bundled, MANIFEST_REL))) {
    return bundled;
  }
  throw new Error(
    "DAF templates not found. Reinstall @daniels-agent-framework/cli or run `npm run build` in the DAF monorepo.",
  );
}

/** Git HEAD at install root, else pin baked into the published package at build time. */
export async function resolveInstallPin(installRoot: string): Promise<string | null> {
  const fromGit = resolveRepoHead(installRoot);
  if (fromGit) return fromGit;
  for (const dir of [
    join(installRoot, "bundled-templates", "global"),
    join(installRoot, "global"),
    installRoot,
  ]) {
    const pin = await readPin(dir);
    if (pin) return pin;
  }
  return null;
}

/** ~/.config/agent unless DAFE_GLOBAL_ROOT is set (tests / overrides). */
export function getGlobalAgentDir(): string {
  const override = process.env.DAFE_GLOBAL_ROOT;
  if (override && override.trim() !== "") return override;
  return join(homedir(), ".config", "agent");
}

export function getProjectAgentDir(cwd: string): string {
  return join(cwd, ".agent");
}

/** ~/.cursor/skills unless DAF_CURSOR_SKILLS_ROOT is set to that directory (tests / overrides). */
export function getCursorSkillsRoot(): string {
  const override = process.env.DAF_CURSOR_SKILLS_ROOT;
  if (override && override.trim() !== "") return override.trim();
  return join(homedir(), ".cursor", "skills");
}

/** ~/.claude/skills unless DAF_CLAUDE_SKILLS_ROOT is set. */
export function getClaudeSkillsRoot(): string {
  const override = process.env.DAF_CLAUDE_SKILLS_ROOT;
  if (override && override.trim() !== "") return override.trim();
  return join(homedir(), ".claude", "skills");
}

/** ~/.codex unless DAF_CODEX_HOME / CODEX_HOME is set. */
export function getCodexHome(): string {
  const override = process.env.DAF_CODEX_HOME ?? process.env.CODEX_HOME;
  if (override && override.trim() !== "") return override.trim();
  return join(homedir(), ".codex");
}

/**
 * Walk upward from `start` until `.agent/config.json` exists (like git discovering `.git`).
 */
export function findAgentDir(start: string): string | null {
  let dir = resolve(start);
  while (true) {
    const agentDir = join(dir, ".agent");
    if (existsSync(join(agentDir, "config.json"))) return agentDir;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}
