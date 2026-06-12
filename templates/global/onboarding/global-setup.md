# Onboarding script: global setup

**Purpose:** Install machine-wide DAF context under `~/.config/agent/`, write **`platforms.json`**, and install native skills per IDE. The agent runs this via **`/daf-onboard`** — there is no `daf` shell command.

**When to use:** First machine setup, after pulling DAF template changes, or when globals are missing/corrupt.

---

## 0 — Resolve paths

| Symbol | Resolution |
|--------|------------|
| **`$T`** | DAF monorepo `templates/` directory. Prefer: walk up from cwd until `templates/global/skill-manifest.json` exists; else ask the user for the DAF repo path and use `<path>/templates`. |
| **`$G`** | `process.env.DAFE_GLOBAL_ROOT` if set and non-empty, else `~/.config/agent`. |
| **`$CS`** | `process.env.DAF_CURSOR_SKILLS_ROOT` if set, else `~/.cursor/skills`. |
| **`$CL`** | `process.env.DAF_CLAUDE_SKILLS_ROOT` if set, else `~/.claude/skills`. |
| **`$CX`** | `process.env.DAF_CODEX_HOME` or `CODEX_HOME` if set, else `~/.codex`. |

**Platforms:** Ask the user which of **`generic`**, **`cursor`**, **`claude`**, **`codex`** apply on this machine (comma-separated). Include **`generic`** unless they only want IDE-native skill paths.

**Force:** If the user asked to overwrite existing installs, pass **`--force`**. Otherwise skip files that already exist (merge-safe).

---

## 1 — Mechanical install (preferred)

When **`$T/global/skill-manifest.json`** exists (DAF repo or clone):

1. From the **DAF repo root**, the **agent** runs `npm install` and `npm run build` when `node_modules` or `packages/cli/dist/global-install.js` is missing — do not instruct the user to run these.
2. Run (shell, from repo root):

```bash
node scripts/global-install.mjs --platforms generic,cursor,claude,codex [--force]
```

(Omit ids the user did not choose. Legacy: `--platform cursor`.)

3. Capture stdout paths; continue to **§3 Verify**.

If the user cannot open the DAF repo, ask them to clone or open it once for install, or perform **§2 Manual install** only when they accept drift risk.

---

## 2 — Manual install (fallback)

Only when **§1** is impossible and the user explicitly agrees.

1. Copy everything under **`$T/global/`** into **`$G`**, **except** do not copy the raw **`skills/`** tree as-is.
2. For each key in **`$T/global/skill-manifest.json`**, copy skill sources → **`$G/skills/<entry.name>.md`**.
3. Copy **`$T/stacks/`** → **`$G/stacks/`** (merge; respect force).
4. Copy if present: **`$T/root-AGENTS.md`**, **`$T/root-BACKLOG.md`**, **`$T/root-LOGBACK.md`** → **`$G/`**.
5. For each selected IDE platform, copy **`$T/platforms/<id>/project/`** → **`$G/platforms/<id>/project/`** when present.
6. **Cursor / Claude:** build **`SKILL.md`** under **`$CS`** / **`$CL`** per `packages/cli/src/platforms/install-skills.ts`.
7. **Codex:** copy **`$T/platforms/codex/global/AGENTS.md`** → **`$CX/AGENTS.md`** when **codex** is selected.
8. Write **`$G/platforms.json`**: `{ "platforms": [ ...chosen ids... ] }`.

---

## 3 — Verify

| Check | Path |
|-------|------|
| Scaffold | `$G/scaffold/config.json` exists |
| Platforms registry | `$G/platforms.json` exists |
| Setup skill | `$G/skills/daf-setup.md` exists and mentions `/daf-setup` |
| Onboard skill | `$G/skills/daf-onboard.md` exists |
| Manifest | `$G/skill-manifest.json` exists |
| Version pin | `$G/daf-pin` is a 40-char git SHA |
| DAF repo path | `$G/daf-repo` points at the clone used for install |
| Version check | `$G/daf-version-check.mjs` exists |
| Stacks | `$G/stacks/typescript.md` (or another built-in) exists |
| Cursor (if selected) | `$G/platforms/cursor/project/.cursor/rules/daf.mdc` exists; `$CS/daf-setup/SKILL.md` exists |
| Claude (if selected) | `$G/platforms/claude/project/.claude/rules/daf.md` exists; `$CL/daf-setup/SKILL.md` exists |
| Codex (if selected) | `$CX/AGENTS.md` mentions DAF |

Report installed paths and **`platforms.json`**. **Handoff:** In any project, run **`/daf-setup`** — it merges overlays for every platform listed there.

---

## Stop condition

Globals installed and verified; user knows next step is **`/daf-setup`** in a project repo.
