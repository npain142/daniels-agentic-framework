import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

export const DAF_PIN_FILENAME = "daf-pin";
export const DAF_REPO_FILENAME = "daf-repo";

const DAF_MONOREPO_MARKER = join("templates", "global", "skill-manifest.json");

/** Git root of `cwd` (`git rev-parse --show-toplevel`); null when not in a repo. */
export function resolveGitTopLevel(cwd: string): string | null {
  try {
    const out = execSync("git rev-parse --show-toplevel", {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const top = out.trim();
    return top !== "" ? resolve(top) : null;
  } catch {
    return null;
  }
}

/** True when `root` looks like the DAF monorepo (main or linked worktree). */
export function isDafMonorepo(root: string): boolean {
  return existsSync(join(root, DAF_MONOREPO_MARKER));
}

/**
 * Resolve which DAF checkout to compare for global-stale:
 * `DAF_REPO` / `--repo` → cwd inside DAF monorepo worktree → `daf-repo` file.
 */
export function resolveDafRepoForVersionCheck(opts: {
  cwd: string;
  envRepo?: string | null;
  fileRepo?: string | null;
}): string | null {
  const fromEnv = opts.envRepo?.trim();
  if (fromEnv) return fromEnv;

  const top = resolveGitTopLevel(opts.cwd);
  if (top && isDafMonorepo(top)) return top;

  const fromFile = opts.fileRepo?.trim();
  return fromFile && fromFile !== "" ? fromFile : null;
}

export type DafVersionStatus = "ok" | "global-stale" | "project-stale" | "both-stale";

const SHA_RE = /^[0-9a-f]{40}$/i;

export function normalizePin(raw: string): string | null {
  const pin = raw.trim().split(/\s/)[0] ?? "";
  return SHA_RE.test(pin) ? pin.toLowerCase() : null;
}

export async function readPin(dir: string): Promise<string | null> {
  try {
    const raw = await readFile(join(dir, DAF_PIN_FILENAME), "utf8");
    return normalizePin(raw);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export async function writePin(dir: string, pin: string): Promise<void> {
  const normalized = normalizePin(pin);
  if (!normalized) {
    throw new Error("daf-pin must be a 40-character git SHA");
  }
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, DAF_PIN_FILENAME), `${normalized}\n`, "utf8");
}

/** Git HEAD of the DAF monorepo at `repoRoot`; null when not a git checkout. */
export function resolveRepoHead(repoRoot: string): string | null {
  if (!existsSync(repoRoot)) return null;
  try {
    const out = execSync("git rev-parse HEAD", {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return normalizePin(out);
  } catch {
    return null;
  }
}

export function checkDafVersion(opts: {
  globalPin: string | null;
  projectPin: string | null;
  repoHead?: string | null;
}): DafVersionStatus {
  const repoHead = opts.repoHead ?? null;
  const globalPin = opts.globalPin;
  const projectPin = opts.projectPin;

  const globalStale =
    repoHead != null && (globalPin == null || globalPin !== repoHead);
  const projectStale =
    globalPin != null && (projectPin == null || projectPin !== globalPin);

  if (globalStale && projectStale) return "both-stale";
  if (globalStale) return "global-stale";
  if (projectStale) return "project-stale";
  return "ok";
}

/** One token for agents: `ok` | `global-stale` | `project-stale` | `both-stale`. */
export function formatStatusLine(status: DafVersionStatus): string {
  return status;
}

export async function readDafRepoPath(globalDir: string): Promise<string | null> {
  try {
    const raw = await readFile(join(globalDir, DAF_REPO_FILENAME), "utf8");
    const path = raw.trim().split(/\s/)[0] ?? "";
    return path !== "" ? path : null;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export async function writeDafRepoPath(globalDir: string, repoPath: string): Promise<void> {
  const trimmed = repoPath.trim();
  if (trimmed === "") {
    throw new Error("daf-repo path must be non-empty");
  }
  await mkdir(globalDir, { recursive: true });
  await writeFile(join(globalDir, DAF_REPO_FILENAME), `${trimmed}\n`, "utf8");
}

/** `DAF_REPO` env overrides `daf-repo` file under global dir. */
export async function resolveDafRepoRoot(
  globalDir: string,
  envOverride?: string | null,
): Promise<string | null> {
  const fromEnv = envOverride?.trim();
  if (fromEnv) return fromEnv;
  return readDafRepoPath(globalDir);
}
