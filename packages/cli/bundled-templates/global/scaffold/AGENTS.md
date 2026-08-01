# AGENTS.md (project)

> **Step 1:** Read `.agent/config.json`. **Step 2:** Follow the load order below. **Step 3:** Act.

Repo-root `AGENTS.md` (when present) is a thin pointer to this file for tools that only read the root.

---

## 1. Two pillars

1. **Layered context** — Global (`~/.config/agent/`) composes with project (`.agent/`). Higher layers override lower ones, never the reverse.
2. **Phase model** — Exactly one phase at a time: `planning`, `developing`, or `maintaining`. Phase-specific rules live in `.agent/phases/{phase}.md` only — no `gates` in JSON, no personas.

State lives in **`.agent/config.json`**: `phase`, `stack`, `check`, `taskCheck`, `codebaseEvery`, `initialTaskCount` (seed for `verify-state.json` when **`/daf-setup`** creates it), optional **`defaultBranch`** (protected name for **maintaining** branch guard), optional **`integrations`** (array of enabled integrations, e.g. `["linear"]`), optional **`linearTeam`** and **`linearTestingState`** (set by **`/daf-linear-setup`** when Linear integration is active). **IDE platforms** are chosen at **`/daf-onboard`** and stored in **`~/.config/agent/platforms.json`** (machine-wide, not in the repo). Runtime task totals live in **`.agent/verify-state.json`** (updated by the agent at session task end per the current phase file).

---

## 2. Load order (every session)

1. `.agent/config.json` — phase, stack, `check`, `taskCheck`, `codebaseEvery`, optional `defaultBranch`, optional `integrations`/`linearTeam`/`linearTestingState`
2. **DAF version gate** — **`daf.mdc`** / **`daf.md`** step 0: one-line shell check; if stale, ask once whether to run **`/daf-update`** for this repo
3. `~/.config/agent/platforms.json` — `platforms[]` from **`/daf-onboard`** (which IDE integrations are installed on this machine)
4. `~/.config/agent/IDENTITY.md` — how the agent works with you
5. `~/.config/agent/stacks/{stack}.md` — **only if** `config.stack` is non-null
6. `.agent/AGENTS.md` — this file
7. `.agent/phases/{config.phase}.md` — current phase bar
8. `.agent/memory/remember.md` — user standing instructions for this project
9. `.agent/memory/gotchas.md` — before non-trivial edits

**Canon** (PRD, GLOSSARY, ARCHITECTURE, product README): **§2.1 KG-first** when `graphify-out/graph.json` exists; otherwise read those files when a task needs them.

**When `config.phase` is `developing` or `maintaining`**, also before implementing work:

10. `.agent/verify-state.json` — `taskCount`, `codebaseCheckPending`
11. `.agent/memory/codebase-snapshot.md` — if present; prefer when fresh over re-loading full canon

### 2.1 KG-first canon (when the graph exists)

When **`graphify-out/graph.json`** exists, do **not** bulk-read `.agent/PRD.md`, `.agent/GLOSSARY.md`, `.agent/ARCHITECTURE.md`, or project `README` for orientation — use Graphify first (`graphify query`, `explain`, `path`; see **`.cursor/rules/graphify.mdc`** when Cursor is onboarded). Read a canonical file only when **editing** it, the graph cites a path and you need exact wording, or queries return insufficient context. After canonical doc edits, run **`/daf-kg-ingest`**. When the graph is **missing**, read canon files directly as needed.

Skills and deeper docs are **on demand**. Invoke DAF skills only as **`/daf-<slug>`** in chat (see §4). Native paths (when listed in `platforms.json`): **`cursor`** → `~/.cursor/skills/daf-*`; **`claude`** → `~/.claude/skills/daf-*`; always available as flat `~/.config/agent/skills/daf-*.md`. Do not document or use unprefixed `/setup`, `/onboard`, etc. for DAF.

---

## 3. Layout (lean)

**Global** `~/.config/agent/`:

- `IDENTITY.md`, `PREFERENCES.md` (optional)
- `platforms.json` — IDE platforms installed on this machine (`/daf-onboard`)
- `scaffold/` — default `.agent/` tree for **`/daf-setup`**
- `onboarding/global-setup.md` — agent script for **`/daf-onboard`**
- `platforms/<id>/project/` — staged project overlays merged by **`/daf-setup`**
- `skills/daf-*.md` — flat skills from manifest
- `daf-pin`, `daf-repo`, `daf-version-check.mjs` — install revision, clone path, one-line stale check
- `stacks/<name>.md` — stack conventions

**IDE globals (when onboarded):** `~/.cursor/skills/daf-*`, `~/.claude/skills/daf-*`, `~/.codex/AGENTS.md` (Codex).

**Project** `.agent/` (committed, machine-agnostic):

- `config.json`, `verify-state.json`, `daf-pin`, `AGENTS.md`, `phases/*.md`, `PRD.md`, `GLOSSARY.md`, `ARCHITECTURE.md`, `memory/*`

**Project IDE hooks (from `/daf-setup`, may be committed):** `.cursor/rules/daf.mdc`, `.cursor/rules/graphify.mdc`, `.claude/rules/daf.md`, repo-root `AGENTS.md` (Codex + tools).

**DAF repo only:** `scripts/global-install.mjs` — mechanical copy invoked during **`/daf-onboard`** (agent runs `npm install` / `npm run build` in the DAF repo when needed).

---

## 4. Skills (v1)

Authoritative catalog: **`~/.config/agent/skill-manifest.json`** (manifest keys → `/daf-<key>`; descriptions in each value). Invoke only **`/daf-<slug>`** in chat. Phase-relevant skills are listed under **Active skills** in `.agent/phases/{phase}.md`. Human intent map: `README.md` § Guided start.

---

## 5. Always-on rules

1. Read `.agent/config.json` first; never hardcode phase or stack. Read **`~/.config/agent/platforms.json`** for IDE integrations on this machine. For DAF workflows, use only **`/daf-<slug>`** skills and **`daf-*`** rules (not unprefixed `/setup`, `/onboard`, or non-`daf` project rules).
2. Honor `.agent/phases/{phase}.md`.
3. Use glossary terms from `graphify explain` or `GLOSSARY.md`; propose additions before inventing synonyms.
4. In **developing** or **maintaining**, follow **`.agent/phases/{phase}.md`** for implementation work: goals in the session only, per-goal `config.taskCheck`, update `.agent/verify-state.json` when a session task ends, two-phase codebase-check when due; then declare done. In **maintaining**, **`config.check`** must be green every session task end, not only when codebase-check applies (see `.agent/phases/maintaining.md`).
5. No push, merge, or destructive shell without explicit user confirmation. In **developing** or **maintaining**, commit committable changes at session task end per **`~/.config/agent/IDENTITY.md`** (Task endings); do not push unless asked.
6. Never paste or commit secrets.
7. End non-trivial tasks with `/daf-retro` (≤3 lines for `memory/learnings.md` or `gotchas.md`).
8. Do not call out or summarize updates to documentation or rules in the user-facing reply unless the user explicitly asked for those edits or asked what changed.
9. In **developing** or **maintaining**, fix **root causes** at the right layer (`IDENTITY.md`): clean code → clean repo → clean product; no symptom patches or copy-paste workarounds without explicit user opt-in.

---

## 6. For humans

1. `README.md` — product overview
2. This file
3. `.agent/config.json`
4. `.agent/GLOSSARY.md` / `.agent/ARCHITECTURE.md`
5. `.agent/phases/{current phase}.md`
