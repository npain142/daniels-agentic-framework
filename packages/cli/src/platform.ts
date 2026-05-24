export type Platform = "generic" | "cursor";

export function parsePlatform(value: string): Platform {
  const v = value.trim().toLowerCase();
  if (v === "generic" || v === "") return "generic";
  if (v === "cursor") return "cursor";
  throw new Error(`Unknown --platform "${value}". Expected "generic" or "cursor".`);
}
