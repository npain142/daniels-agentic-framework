import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { Platform } from "./platform.js";
import { PLATFORM_IDS } from "./platform.js";
import { getGlobalAgentDir } from "./paths.js";

export type GlobalPlatformsConfig = {
  platforms: Platform[];
};

function parsePlatformId(value: unknown, index: number): Platform {
  if (typeof value !== "string" || !PLATFORM_IDS.includes(value as Platform)) {
    throw new Error(
      `platforms.json platforms[${index}] must be one of: ${PLATFORM_IDS.join(", ")} (got ${JSON.stringify(value)})`,
    );
  }
  return value as Platform;
}

export function parseGlobalPlatforms(raw: string): GlobalPlatformsConfig {
  const data = JSON.parse(raw) as unknown;
  if (typeof data !== "object" || data === null) {
    throw new Error("platforms.json must be a JSON object");
  }
  const o = data as Record<string, unknown>;
  const platformsRaw = o.platforms;
  if (!Array.isArray(platformsRaw)) {
    throw new Error('platforms.json must contain a "platforms" array');
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

export function globalPlatformsPath(globalDir?: string): string {
  return join(globalDir ?? getGlobalAgentDir(), "platforms.json");
}

export async function readGlobalPlatforms(globalDir?: string): Promise<GlobalPlatformsConfig> {
  try {
    const raw = await readFile(globalPlatformsPath(globalDir), "utf8");
    return parseGlobalPlatforms(raw);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return { platforms: ["generic"] };
    throw err;
  }
}

export async function writeGlobalPlatforms(
  globalDir: string,
  config: GlobalPlatformsConfig,
): Promise<void> {
  const body = `${JSON.stringify(config, null, 2)}\n`;
  await writeFile(globalPlatformsPath(globalDir), body, "utf8");
}
