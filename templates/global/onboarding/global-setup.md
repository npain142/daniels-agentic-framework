# Onboarding script: global setup

**Purpose:** Install machine-wide DAF context under `~/.config/agent/` and (on Cursor) `~/.cursor/skills/daf-*/`. The IDE agent runs this script via **`/onboard`** — there is no `daf` shell command.

**When to use:** First machine setup, after pulling DAF template changes, or when globals are missing/corrupt.

---

## 0 — Resolve paths

| Symbol | Resolution |
|--------|------------|
| **`$T`** | DAF monorepo `templates/` directory. Prefer: walk up from cwd until `templates/global/skill-manifest.json` exists; else ask the user for the DAF repo path and use `<path>/templates`. |
| **`$G`** | `process.env.DAFE_GLOBAL_ROOT` if set and non-empty, else `~/.config/agent`. |
| **`$CS`** | `process.env.DAF_CURSOR_SKILLS_ROOT` if set and non-empty, else `~/.cursor/skills`. |

**Platform:** On **Cursor**, use **`cursor`**. Otherwise use **`generic`** (flat `daf-*.md` under `$G/skills/` only).

**Force:** If the user asked to overwrite existing installs, pass **`--force`**. Otherwise skip files that already exist (merge-safe).

---

## 1 — Mechanical install (preferred)

When **`$T/global/skill-manifest.json`** exists (DAF repo or clone):

1. From the **DAF repo root** (parent of `templates/`), ensure dependencies are built: `npm install` and `npm run build` if `packages/cli/dist/global-install.js` is missing.
2. Run (shell, from repo root):

```bash
node scripts/global-install.mjs --platform <generic|cursor> [--force]
```

3. Capture stdout paths; continue to **§3 Verify**.

If the user cannot open the DAF repo, ask them to clone or open it once for install, or perform **§2 Manual install** only when they accept the risk of drift from the canonical installer.

---

## 2 — Manual install (fallback)

Only when **§1** is impossible and the user explicitly agrees.

1. Copy everything under **`$T/global/`** into **`$G`**, **except** do not copy the raw **`skills/`** tree as-is.
2. For each key in **`$T/global/skill-manifest.json`**, copy **`$T/global/skills/<key>.md`** → **`$G/skills/<entry.name>.md`** (e.g. `setup` → `daf-setup.md`). Skip if destination exists and not force.
3. Copy **`$T/stacks/`** → **`$G/stacks/`** (merge; respect force).
4. Copy if present: **`$T/root-AGENTS.md`**, **`$T/root-BACKLOG.md`**, **`$T/root-LOGBACK.md`** → **`$G/`** (same basenames).
5. **Cursor platform:** copy **`$T/platforms/cursor/project/`** → **`$G/platforms/cursor/project/`** (merge). For each manifest entry, build **`$CS/<entry.name>/SKILL.md`**: YAML frontmatter (`name`, `description`, `disable-model-invocation: true`) + body from skill file with leading `# Skill: /…` line stripped. See `packages/cli/src/platforms/cursor.ts` for the exact shape.

---

## 3 — Verify

| Check | Path |
|-------|------|
| Scaffold | `$G/scaffold/config.json` exists |
| Setup skill | `$G/skills/daf-setup.md` exists and mentions `/setup` |
| Onboard skill | `$G/skills/daf-onboard.md` exists |
| Manifest | `$G/skill-manifest.json` exists |
| Stacks | `$G/stacks/typescript.md` (or another built-in) exists |
| Cursor (if platform cursor) | `$G/platforms/cursor/project/.cursor/rules/daf.mdc` exists |
| Cursor skills (if platform cursor) | `$CS/daf-setup/SKILL.md` exists |

Report installed paths and platform. **Handoff:** In any project, run **`/setup`** for per-repo `.agent/`.

---

## Stop condition

Globals installed and verified; user knows next step is **`/setup`** in a project repo.
