import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { mkdtemp } from "node:fs/promises";
import { describe, expect, it, afterEach } from "vitest";

import { writePin } from "./daf-version.js";
import { refreshProjectDaf } from "./project-update.js";

const PIN = "dddddddddddddddddddddddddddddddddddddddd";

describe("refreshProjectDaf", () => {
  afterEach(() => {
    delete process.env.DAFE_GLOBAL_ROOT;
  });

  it("applies overlays and writes project daf-pin without overwriting config.json", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-refresh-"));
    const globalDir = join(root, "global");
    const repoRoot = join(root, "repo");
    const agentDir = join(repoRoot, ".agent");

    await mkdir(join(globalDir, "platforms", "cursor", "project", ".cursor", "rules"), {
      recursive: true,
    });
    await writeFile(
      join(globalDir, "platforms", "cursor", "project", ".cursor", "rules", "daf.mdc"),
      "cursor-rule",
      "utf8",
    );
    await mkdir(join(globalDir, "scaffold", "phases"), { recursive: true });
    await writeFile(join(globalDir, "scaffold", "phases", "planning.md"), "new-planning", "utf8");
    await writePin(globalDir, PIN);

    await mkdir(agentDir, { recursive: true });
    await writeFile(
      join(agentDir, "config.json"),
      JSON.stringify({ phase: "developing", stack: "typescript", check: "npm test", taskCheck: "npm test", codebaseEvery: 5, initialTaskCount: 0 }, null, 2),
      "utf8",
    );
    await writeFile(join(agentDir, "phases", "planning.md"), "old-planning", "utf8").catch(async () => {
      await mkdir(join(agentDir, "phases"), { recursive: true });
      await writeFile(join(agentDir, "phases", "planning.md"), "old-planning", "utf8");
    });

    const { pin, appliedPlatforms } = await refreshProjectDaf({
      repoRoot,
      globalDir,
      platforms: ["cursor"],
      force: false,
    });

    expect(pin).toBe(PIN);
    expect(appliedPlatforms).toEqual(["cursor"]);
    expect(await readFile(join(repoRoot, ".cursor", "rules", "daf.mdc"), "utf8")).toBe("cursor-rule");
    expect(await readFile(join(agentDir, "daf-pin"), "utf8")).toBe(`${PIN}\n`);
    expect(await readFile(join(agentDir, "phases", "planning.md"), "utf8")).toBe("old-planning");
  });

  it("force overwrites scaffold files except config.json", async () => {
    const root = await mkdtemp(join(tmpdir(), "daf-refresh-force-"));
    const globalDir = join(root, "global");
    const repoRoot = join(root, "repo");
    const agentDir = join(repoRoot, ".agent");

    await mkdir(join(globalDir, "scaffold"), { recursive: true });
    await writeFile(join(globalDir, "scaffold", "AGENTS.md"), "new-agents", "utf8");
    await writePin(globalDir, PIN);

    await mkdir(agentDir, { recursive: true });
    await writeFile(
      join(agentDir, "config.json"),
      JSON.stringify({ phase: "planning", stack: null, check: "npm test", taskCheck: "npm test", codebaseEvery: 5, initialTaskCount: 0 }, null, 2),
      "utf8",
    );
    await writeFile(join(agentDir, "AGENTS.md"), "old-agents", "utf8");

    await refreshProjectDaf({
      repoRoot,
      globalDir,
      platforms: ["generic"],
      force: true,
    });

    expect(await readFile(join(agentDir, "AGENTS.md"), "utf8")).toBe("new-agents");
    const cfg = await readFile(join(agentDir, "config.json"), "utf8");
    expect(cfg).toContain('"phase": "planning"');
  });
});
