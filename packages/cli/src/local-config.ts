import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { Platform } from "./platform.js";

export type DafLocalConfig = {
  /** IDE integration layers applied on this machine via `/setup` (may list more than one). */
  platforms: Platform[];
};

function parsePlatformId(value: unknown, index: number): Platform {
  if (value !== "generic" && value !== "cursor") {
    throw new Error(
      `local.json platforms[${index}] must be "generic" or "cursor" (got ${JSON.stringify(value)})`,
    );
  }
  return value;
}

export function parseLocalConfig(raw: string): DafLocalConfig {
  const data = JSON.parse(raw) as unknown;
  if (typeof data !== "object" || data === null) {
    throw new Error("local.json must be a JSON object");
  }
  const o = data as Record<string, unknown>;
  const platformsRaw = o.platforms;
  if (platformsRaw === undefined) {
    return { platforms: [] };
  }
  if (!Array.isArray(platformsRaw)) {
    throw new Error('local.json "platforms" must be an array');
  }
  const seen = new Set<Platform>();
  const platforms: Platform[] = [];
  for (let i = 0; i < platformsRaw.length; i++) {
    const id = parsePlatformId(platformsRaw[i], i);
    if (!seen.has(id)) {
      seen.add(id);
      platforms.push(id);
    }
  }
  return { platforms };
}

export function defaultLocalConfig(): DafLocalConfig {
  return { platforms: [] };
}

export async function readLocalConfig(agentDir: string): Promise<DafLocalConfig> {
  try {
    const raw = await readFile(join(agentDir, "local.json"), "utf8");
    return parseLocalConfig(raw);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return defaultLocalConfig();
    throw err;
  }
}

export async function writeLocalConfig(agentDir: string, config: DafLocalConfig): Promise<void> {
  const body = `${JSON.stringify(config, null, 2)}\n`;
  await writeFile(join(agentDir, "local.json"), body, "utf8");
}
