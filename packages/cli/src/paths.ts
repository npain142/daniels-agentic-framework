import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Repo root (contains `templates/` and `packages/`).
 */
export function getRepoRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  // packages/cli/dist -> ../../../
  return join(here, "..", "..", "..");
}

export function getTemplatesRoot(): string {
  return join(getRepoRoot(), "templates");
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
