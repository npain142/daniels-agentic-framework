import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export const CODEX_AGENTS_MARKERS = [
  "Daniels Agentic Framework (DAF)",
  "Daniel Agent Framework (DAF)",
] as const;

export async function installCodexGlobalAgents(opts: {
  templatesRoot: string;
  codexHome: string;
  force: boolean;
}): Promise<void> {
  const src = join(opts.templatesRoot, "platforms", "codex", "global", "AGENTS.md");
  if (!existsSync(src)) {
    throw new Error(`Missing Codex global template: ${src}`);
  }
  await mkdir(opts.codexHome, { recursive: true });
  const dest = join(opts.codexHome, "AGENTS.md");
  if (!opts.force && existsSync(dest)) {
    const existing = await readFile(dest, "utf8");
    if (CODEX_AGENTS_MARKERS.some((marker) => existing.includes(marker))) {
      return;
    }
  }
  const raw = await readFile(src, "utf8");
  await writeFile(dest, raw, "utf8");
}
