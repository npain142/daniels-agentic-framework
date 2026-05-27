# AGENTS.md (project)

> **Step 1:** Read `.agent/config.json`. **Step 2:** Follow the load order below. **Step 3:** Act.

The repo root may duplicate this file as `AGENTS.md` for tools that only read the root.

---

## 1. Two pillars

1. **Layered context** — Global (`~/.config/agent/`) composes with project (`.agent/`). Higher layers override lower ones, never the reverse.
2. **Phase model** — Exactly one phase at a time: `planning`, `developing`, or `maintaining`. Phase-specific rules live in `.agent/phases/{phase}.md` only — no `gates` in JSON, no personas.

State lives in **`.agent/config.json`**: `phase`, `stack`, `check`, `taskCheck`, `codebaseEvery`, `initialTaskCount` (seed for `verify-state.json` when **`/setup`** creates it), optional **`defaultBranch`** (protected name for **maintaining** branch guard). **IDE platforms** are chosen at **`/onboard`** and stored in **`~/.config/agent/platforms.json`** (machine-wide, not in the repo). Runtime task totals live in **`.agent/verify-state.json`** (updated by the agent at session task end per the current phase file).

---

## 2. Load order (every session)

1. `.agent/config.json` — phase, stack, `check`, `taskCheck`, `codebaseEvery`, optional `defaultBranch`
2. `~/.config/agent/platforms.json` — `platforms[]` from **`/onboard`** (which IDE integrations are installed on this machine)
3. `~/.config/agent/IDENTITY.md` — how the agent works with you
4. `~/.config/agent/stacks/{stack}.md` — **only if** `config.stack` is non-null
5. `.agent/AGENTS.md` — this file
6. `.agent/phases/{config.phase}.md` — current phase bar
7. `.agent/GLOSSARY.md` — canonical terms (stub OK late in planning; keep current in developing / maintaining)
8. `.agent/memory/remember.md` — user standing instructions for this project
9. `.agent/memory/gotchas.md` — before non-trivial edits

**When `config.phase` is `developing` or `maintaining`**, also read before implementing work:

10. `.agent/verify-state.json` — `taskCount`, `codebaseCheckPending`
11. `.agent/memory/codebase-snapshot.md` — if present; prefer when fresh over re-reading every canonical doc each session

Skills and deeper docs are **on demand**. Native skill paths (when listed in `platforms.json`): **`cursor`** → `~/.cursor/skills/daf-*`; **`claude`** → `~/.claude/skills/daf-*`; always available as flat `~/.config/agent/skills/daf-*.md`.

---

## 3. Layout (lean)

**Global** `~/.config/agent/`:

- `IDENTITY.md`, `PREFERENCES.md` (optional)
- `platforms.json` — IDE platforms installed on this machine (`/onboard`)
- `scaffold/` — default `.agent/` tree for **`/setup`**
- `onboarding/global-setup.md` — agent script for **`/onboard`**
- `platforms/<id>/project/` — staged project overlays merged by **`/setup`**
- `skills/daf-*.md` — flat skills from manifest
- `stacks/<name>.md` — stack conventions

**IDE globals (when onboarded):** `~/.cursor/skills/daf-*`, `~/.claude/skills/daf-*`, `~/.codex/AGENTS.md` (Codex).

**Project** `.agent/` (committed, machine-agnostic):

- `config.json`, `verify-state.json`, `AGENTS.md`, `phases/*.md`, `PRD.md`, `GLOSSARY.md`, `ARCHITECTURE.md`, `memory/*`

**Project IDE hooks (from `/setup`, may be committed):** `.cursor/rules/daf.mdc`, `.claude/rules/daf.md`, repo-root `AGENTS.md` (Codex + tools).

**DAF repo only:** `scripts/global-install.mjs` — mechanical copy invoked during **`/onboard`** (agent runs `npm install` / `npm run build` in the DAF repo when needed).

---

## 4. Skills (v1)

| Skill | Typical phase |
|--------|----------------|
| `/onboard` | any — **machine setup:** install `~/.config/agent/`, `platforms.json`, per-IDE skills/overlays |
| `/setup` | any — **project setup:** scaffold `.agent/`; merge IDE overlays for every platform in `platforms.json` |
| `/grill-me` | planning (product grill); **developing** / **maintaining** (realignment) |
| `/start` | after planning — validate exit, enter **developing**, session kickoff |
| `/help` | any — short framework guide: phases, skills, build loop |
| `/how-it-works` | any — implementation-precise explanation of a code topic |
| `/ltm-checkup` | developing / maintaining — reconcile with external LTM (e.g. Notion MCP) |
| `/new-feature` | developing — **net-new** capability |
| `/issue` | developing or maintaining |
| `/improvement` | any — **enhances existing**; implement in developing or maintaining |
| `/pivot` | any — **restructure or redesign** existing feature/concept; implement in developing or maintaining |
| `/discuss` | any — explore ideas; no implementation unless asked |
| `/backlog-add` | any — append follow-up to repo-root `BACKLOG.md` |
| `/backlog-work` | developing / maintaining — pick backlog item, implement, archive to `LOGBACK.md` |
| `/remember` | any — save standing instructions to `memory/remember.md` |
| `/retro` | any |
| `/phase-transition` | any — validate planning exit; set `config.phase` |
| `/remove` | any — strip `.agent/`, DAF root `AGENTS.md`, IDE overlay files from **this repo** |
| `/remove-global` | any — uninstall `~/.config/agent/` and IDE `daf-*` skills (machine-wide) |

---

## 5. Always-on rules

1. Read `.agent/config.json` first; never hardcode phase or stack. Read **`~/.config/agent/platforms.json`** for IDE integrations on this machine.
2. Honor `.agent/phases/{phase}.md`.
3. Use `GLOSSARY.md` terms; propose additions before inventing synonyms.
4. In **developing** or **maintaining**, follow **`.agent/phases/{phase}.md`** for implementation work: goals in the session only, per-goal `config.taskCheck`, update `.agent/verify-state.json` when a session task ends, two-phase codebase-check when due; then declare done. In **maintaining**, **`config.check`** must be green every session task end, not only when codebase-check applies (see `.agent/phases/maintaining.md`).
5. No commit, push, merge, or destructive shell without explicit user confirmation.
6. Never paste or commit secrets.
7. End non-trivial tasks with `/retro` (≤3 lines for `memory/learnings.md` or `gotchas.md`).
8. Do not call out or summarize updates to documentation or rules in the user-facing reply unless the user explicitly asked for those edits or asked what changed.
9. In **developing** or **maintaining**, fix **root causes** at the right layer (`IDENTITY.md`): clean code → clean repo → clean product; no symptom patches or copy-paste workarounds without explicit user opt-in.

---

## 6. For humans

1. `README.md` — product overview
2. This file
3. `.agent/config.json`
4. `.agent/GLOSSARY.md` / `.agent/ARCHITECTURE.md`
5. `.agent/phases/{current phase}.md`
