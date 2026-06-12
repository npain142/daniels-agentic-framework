import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getRepoRoot } from "./paths.js";
import { CODEX_AGENTS_MARKERS } from "./platforms/codex.js";

const CANONICAL = "Daniels Agentic Framework";
const DEPRECATED = "Daniel Agent Framework";

const BRANDED_PATHS = [
  "README.md",
  ".agent/GLOSSARY.md",
  ".agent/PRD.md",
  ".cursor/rules/daf.mdc",
  ".cursor/rules/graphify.mdc",
  "templates/platforms/cursor/project/.cursor/rules/daf.mdc",
  "templates/platforms/cursor/project/.cursor/rules/graphify.mdc",
  "templates/platforms/claude/project/.claude/rules/daf.md",
  "templates/platforms/codex/global/AGENTS.md",
] as const;

function assertDeprecatedSpelling(text: string, rel: string): void {
  if (rel === ".agent/GLOSSARY.md") {
    const hits = text.split(DEPRECATED).length - 1;
    expect(hits, rel).toBe(1);
    expect(text, rel).toMatch(/Do not use \*\*Daniel Agent Framework\*\*/);
    return;
  }
  expect(text, rel).not.toContain(DEPRECATED);
}

describe("product branding", () => {
  it("uses the canonical product name in user-facing templates and docs", async () => {
    const root = getRepoRoot();
    for (const rel of BRANDED_PATHS) {
      const text = await readFile(join(root, rel), "utf8");
      expect(text, rel).toContain(CANONICAL);
      assertDeprecatedSpelling(text, rel);
    }
  });

  it("exports Codex AGENTS.md markers including canonical and legacy spellings", () => {
    expect(CODEX_AGENTS_MARKERS).toContain(`${CANONICAL} (DAF)`);
    expect(CODEX_AGENTS_MARKERS).toContain(`${DEPRECATED} (DAF)`);
  });
});
