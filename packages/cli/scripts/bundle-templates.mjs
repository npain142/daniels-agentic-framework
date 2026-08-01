#!/usr/bin/env node
import { execSync } from "node:child_process";
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, "..");
const repoRoot = join(pkgRoot, "..", "..");
const src = join(repoRoot, "templates");
const dest = join(pkgRoot, "bundled-templates");

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
await cp(src, dest, { recursive: true });

let pin = "";
try {
  pin = execSync("git rev-parse HEAD", { cwd: repoRoot, encoding: "utf8" }).trim();
} catch {
  pin = "0000000000000000000000000000000000000000";
}

await mkdir(join(dest, "global"), { recursive: true });
await writeFile(join(dest, "global", "daf-pin"), `${pin}\n`, "utf8");
