# AGENTS.md (project)

> **Step 1:** Read `.agent/config.json`. **Step 2:** Follow the load order below. **Step 3:** Act.

The repo root may duplicate this file as `AGENTS.md` for tools that only read the root.

---

## 1. Two pillars

1. **Layered context** — Global (`~/.config/agent/`) composes with project (`.agent/`). Higher layers override lower ones, never the reverse.
2. **Phase model** — Exactly one phase at a time: `planning`, `developing`, or `maintaining`. Phase-specific rules live in `.agent/phases/{phase}.md` only — no `gates` in JSON, no personas.

State lives in **`.agent/config.json`**: `phase`, `stack`, `check`, `taskCheck`, `codebaseEvery`, `initialTaskCount` (seed for `verify-state.json` when **`/setup`** creates it), optional `platform` (e.g. `cursor` after **`/setup`** applied the Cursor overlay), optional **`defaultBranch`** (protected name for **maintaining** branch guard). Runtime task totals live in **`.agent/verify-state.json`** (updated by the agent at session task end per the current phase file).

---

## 2. Load order (every session)

1. `.agent/config.json` — phase, stack, `check`, `taskCheck`, `codebaseEvery`, optional `platform`, optional `defaultBranch`
2. `~/.config/agent/IDENTITY.md` — how the agent works with you
3. `~/.config/agent/stacks/{stack}.md` — **only if** `config.stack` is non-null
4. `.agent/AGENTS.md` — this file
5. `.agent/phases/{config.phase}.md` — current phase bar
6. `.agent/GLOSSARY.md` — canonical terms (stub OK late in planning; keep current in developing / maintaining)
7. `.agent/memory/remember.md` — user standing instructions for this project
8. `.agent/memory/gotchas.md` — before non-trivial edits

**When `config.phase` is `developing` or `maintaining`**, also read before implementing work:

9. `.agent/verify-state.json` — `taskCount`, `codebaseCheckPending`
10. `.agent/memory/codebase-snapshot.md` — if present; prefer when fresh over re-reading every canonical doc each session

Skills and deeper docs are **on demand**. Procedures live in `~/.config/agent/skills/daf-*.md` after `daf global-setup`, or under `~/.cursor/skills/daf-*` after `daf global-setup --platform cursor` (and `.cursor/rules/` when **`/setup`** merged the Cursor project overlay).

---

## 3. Layout (lean)

**Global** `~/.config/agent/`:

- `IDENTITY.md`, `PREFERENCES.md` (optional)
- `scaffold/` — default `.agent/` tree for **`/setup`**
- `skills/daf-*.md` — same filenames as `~/.config/agent/skills/` after **`daf global-setup`** (manifest: `~/.config/agent/skill-manifest.json`): `/setup`, `/grill-me`, `/new-project` (redirect), `/daf-migrate` (redirect), `/new-feature`, `/issue`, `/improvement`, `/pivot`, `/discuss`, `/remember`, `/retro`, `/phase-transition`, `/remove`, `/remove-global`
- `stacks/<name>.md` — stack conventions

**Cursor (optional):** `~/.cursor/skills/daf-*/SKILL.md` after `daf global-setup --platform cursor`; project `.cursor/rules/` after **`/setup`** on Cursor.

**Project** `.agent/`:

- `config.json`, `verify-state.json`, `AGENTS.md`, `phases/planning.md`, `phases/developing.md`, `phases/maintaining.md`
- `PRD.md`, `GLOSSARY.md`, `ARCHITECTURE.md`
- `memory/remember.md`, `memory/gotchas.md`, `memory/learnings.md`

**CLI** `daf` — **`daf global-setup`** only (copies globals + scaffold + optional Cursor skills). It does **not** run the agent.

---

## 4. Skills (v1)

| Skill | Typical phase |
|--------|----------------|
| `/setup` | any — **project setup:** greenfield scaffold; brownfield inventory + interview then merge scaffold and docs; verify-state; Cursor overlay |
| `/grill-me` | planning |
| `/new-project` | planning — **deprecated**; use `/setup` |
| `/daf-migrate` | planning — **deprecated**; use `/setup` + doc alignment |
| `/new-feature` | developing — **net-new** capability |
| `/issue` | developing or maintaining |
| `/improvement` | any — **enhances existing**; implement in developing or maintaining |
| `/pivot` | any — **restructure or redesign** existing feature/concept; implement in developing or maintaining |
| `/discuss` | any — explore ideas; no implementation unless asked |
| `/remember` | any — save standing instructions to `memory/remember.md` |
| `/retro` | any |
| `/phase-transition` | any — validate planning exit; set `config.phase` |
| `/remove` | any — strip `.agent/`, DAF root `AGENTS.md`, Cursor `daf.mdc` from **this repo** |
| `/remove-global` | any — uninstall `~/.config/agent/` and Cursor `daf-*` skills (machine-wide) |

---

## 5. Always-on rules

1. Read `.agent/config.json` first; never hardcode phase, stack, or platform.
2. Honor `.agent/phases/{phase}.md`.
3. Use `GLOSSARY.md` terms; propose additions before inventing synonyms.
4. In **developing** or **maintaining**, follow **`.agent/phases/{phase}.md`** for implementation work: goals in the session only, per-goal `config.taskCheck`, update `.agent/verify-state.json` when a session task ends, two-phase codebase-check when due; then declare done. In **maintaining**, **`config.check`** must be green every session task end, not only when codebase-check applies (see `.agent/phases/maintaining.md`).
5. No commit, push, merge, or destructive shell without explicit user confirmation.
6. Never paste or commit secrets.
7. End non-trivial tasks with `/retro` (≤3 lines for `memory/learnings.md` or `gotchas.md`).
8. Do not call out or summarize updates to documentation or rules (e.g. `.agent/*.md`, `AGENTS.md`, `.cursor/rules/`, DAF skills) in the user-facing reply unless the user explicitly asked for those edits or asked what changed.

---

## 6. For humans

1. `README.md` — product overview
2. This file
3. `.agent/config.json`
4. `.agent/GLOSSARY.md` / `.agent/ARCHITECTURE.md`
5. `.agent/phases/{current phase}.md`
