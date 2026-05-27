export type Platform = "generic" | "cursor" | "claude" | "codex";

export const PLATFORM_IDS: readonly Platform[] = ["generic", "cursor", "claude", "codex"] as const;

export const IDE_PLATFORMS: readonly Platform[] = ["cursor", "claude", "codex"] as const;

export function parsePlatform(value: string): Platform {
  const v = value.trim().toLowerCase();
  if (v === "generic" || v === "") return "generic";
  if (v === "cursor") return "cursor";
  if (v === "claude") return "claude";
  if (v === "codex") return "codex";
  throw new Error(
    `Unknown platform "${value}". Expected one of: ${PLATFORM_IDS.join(", ")}.`,
  );
}

/** Parse comma-separated or repeated CLI values into a deduped platform list. */
export function parsePlatformsList(values: string[]): Platform[] {
  const seen = new Set<Platform>();
  const out: Platform[] = [];
  for (const raw of values) {
    for (const part of raw.split(",")) {
      const id = parsePlatform(part);
      if (!seen.has(id)) {
        seen.add(id);
        out.push(id);
      }
    }
  }
  return out;
}

/** Default when user does not specify: cursor on Cursor-like env is agent's job; installer default is generic only. */
export function defaultPlatformsForInstall(explicit: Platform[]): Platform[] {
  if (explicit.length > 0) return explicit;
  return ["generic"];
}
