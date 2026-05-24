# PRD — Daniel Agent Framework (DAF) v1

## Goal

Ship a **minimal CLI** (`daf global-setup`) that installs global agent context—including a **scaffold** copy under `~/.config/agent/scaffold/`—and optional **Cursor** platform integration (`--platform cursor`). Per-repo `.agent/` is created or merged by the IDE agent following **`/setup`** (**project setup**): greenfield copies scaffold; brownfield runs inventory + interview, then merges scaffold and populates PRD / glossary / architecture. **Planning exit** (to **developing** or **maintaining**) is enforced by **`/phase-transition`** using the same checklist as the unit-tested `validatePlanningExit` helper in the repo (thresholds stay in sync with that module). The IDE agent reads the same files; no duplicate “living config” beyond `.agent/config.json`.

## Non-goals

- Personas, JSON `gates`, task-folder workflows, or MCP ingestion in v1.
- `/release` train automation or ADR/schema enforcement beyond the planning-exit checklist.
- Running LLM calls, prompts, or agent sessions inside the CLI (filesystem copy only).
- Publishing to npm in v1 (local `pnpm` / `pnpm link --global` is enough until templates stabilize).

## v1 scope

- **Commands:** `daf global-setup [--platform generic|cursor] [--force]` only.
- **Templates:** `templates/global` (identity, preferences, **`skill-manifest.json`**, skill sources under `skills/`, **scaffold** subtree for `~/.config/agent/scaffold/`), `templates/stacks` (`general`, `typescript`, `typescript-react`), `templates/platforms/cursor` (project `.cursor/rules` overlay only). Stub dirs `templates/platforms/claude`, `templates/platforms/codex` for future installers.
- **Config contract:** `{ "phase", "stack" | null, "check", "taskCheck", "codebaseEvery", "initialTaskCount", "platform"? }` — `phase` may be `maintaining`; `platform` is optional (`cursor` when `/setup` applied the Cursor overlay). `initialTaskCount` seeds `.agent/verify-state.json` when `/setup` creates verify-state.
- **Skills (markdown):** `/setup`, `/grill-me`, `/new-project` (redirect), `/daf-migrate` (redirect), `/new-feature`, `/issue`, `/improvement`, `/pivot`, `/task`, `/discuss`, `/remember`, `/retro`, `/phase-transition`.
- **Stack selection:** not during **greenfield** scaffold-only `/setup` (`stack` stays `null` from template); user or agent sets `config.stack` after **`/grill-me`** or at the end of **brownfield `/setup`** (interview inside that skill) when product and constraints are clear.

## Success

From an empty directory: user runs `daf global-setup` (and `daf global-setup --platform cursor` on Cursor). Agent runs **`/setup`**: **greenfield** copies from `~/.config/agent/scaffold/` into `.agent/` in **planning** with `stack: null`, writes `verify-state.json`, and optionally merges `.cursor/rules/daf.mdc` + sets `platform: "cursor"`. **Brownfield** `/setup` inventories and interviews first, then merges missing scaffold files without overwriting healthy `config.json`, and fills canonical docs from the session. After PRD + glossary + architecture meet the checklist and `config.stack` is set (e.g. `typescript`), **`/phase-transition`** to **developing** or **maintaining** succeeds. In this monorepo, `npm run check` passes with tests covering planning exit, global-setup (including scaffold), and Cursor install paths.
