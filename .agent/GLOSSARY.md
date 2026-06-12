# Glossary — DAF monorepo

| Term | Definition |
|------|------------|
| **DAF** | Daniels Agentic Framework — markdown-first agent context; skills-only install (no `daf` CLI). |
| **Global context** | Files under `~/.config/agent/` (identity, preferences, skills, stacks, scaffold, onboarding script). |
| **Global setup** | IDE skill **`/daf-onboard`** — machine-wide install of global context; not per repo. |
| **Onboarding script** | `templates/global/onboarding/global-setup.md` (also installed under `~/.config/agent/onboarding/`). |
| **Project setup** | IDE skill **`/daf-setup`** — adapts DAF to the current repo after global setup. |
| **daf-pin** | Single-line git SHA: `~/.config/agent/daf-pin` (last **`/daf-onboard`**) and `.agent/daf-pin` (last **`/daf-setup`** or **`/daf-update`**). Compared by `daf-version-check` (one token, no LLM). |
| **daf-repo** | Path to the DAF monorepo clone used at last **`/daf-onboard`** (`~/.config/agent/daf-repo`); version check compares global pin to that clone’s `HEAD`. |
| **DAF update** | **`daf.mdc`** step 0 detects staleness each session and prompts once; **`/daf-update`** applies refresh when the user agrees. |
| **Scaffold** | Default `.agent/` tree at `~/.config/agent/scaffold/`; agents copy or merge via `/daf-setup`. |
| **DAF skill** | Markdown procedure invoked in chat as **`/daf-<slug>`** (e.g. `/daf-setup`); installed as `daf-<slug>.md` under `$G/skills/` or `~/.cursor/skills/daf-<slug>/`. Not a shell command. Do not document or invoke unprefixed `/setup`, `/onboard`, etc. |
| **Phase** | `planning`, `developing`, or `maintaining`; stored in `config.json` and `phases/*.md`. |
| **Stack** | String id matching `~/.config/agent/stacks/<id>.md`; e.g. `typescript`. |
| **Platform** | IDE integration layer: `generic`, `cursor`, `claude`, `codex`. Chosen at **`/daf-onboard`**; listed in **`~/.config/agent/platforms.json`**. |
| **platforms.json** | Machine-wide registry at `$G/platforms.json` — which IDEs were onboarded; **`/daf-setup`** applies project overlays for each listed id. |
| **Layered context** | Global (`~/.config/agent/`) composes with project (`.agent/`); higher layers override lower. |
| **taskCheck** | Fast verification command after each session goal (e.g. `npm run test`). |
| **check** | Full verification suite (e.g. `npm run check`). |
| **taskCount** | Completed session tasks in `verify-state.json`; updated at session task end per the current phase file. |
| **codebaseEvery** | Interval for two-phase codebase-check when `taskCount` hits multiples. |
| **Codebase check** | Phase A: refresh `memory/codebase-snapshot.md`; Phase B: run `config.check`. |
| **Task summary** | Brief wrap-up when declaring done after a session task; commits committable changes per `IDENTITY.md` and ends with **Committed:** `<hash>` — `<subject>`. |
| **Backlog** | Open follow-ups at repo root in `BACKLOG.md` (`## Open`, optional `## In progress`); not session goals in `.agent/`. Managed via `/daf-backlog-add` and `/daf-backlog-work`. |
| **Logback** | Fading archive at repo root in `LOGBACK.md`: short artifacts from completed backlog items; auto-pruned (7d untagged, 14d tagged, `#keep` retained). |
| **Realignment** | `/daf-grill-me` in **developing** or **maintaining**: resync user intent with PRD, architecture, code, and backlog. |
| **LTM** | Long-term memory outside `.agent/` (e.g. Notion); reconciled via `/daf-ltm-checkup`. |
| **Knowledge graph (KG)** | Project graph in `graphify-out/` (Graphify): domain/concept nodes from canonical `.agent/` docs + code nodes from AST. |
| **Domain graph** | Semantic layer: concepts, phases, skills, rationale from PRD/GLOSSARY/ARCHITECTURE and bootstrap sources — created at **planning → developing** transition. |
| **Code graph** | Structural layer: imports, calls, symbols — grows via `npm run kg:ingest` / `graphify update .` during **developing**. |
| **KG bootstrap** | Planning-exit ritual: `kg:bootstrap` + agent semantic extraction + `kg-bootstrap.json` receipt (`status: ok`). |
| **KG ingest** | Developing/maintaining refresh: `npm run kg:ingest` + `/daf-kg-ingest` when canonical docs change. |
| **KG-first canon** | When `graphify-out/graph.json` exists, load PRD/architecture/glossary via `graphify query` / `explain` instead of bulk-reading canonical `.md` files (AGENTS.md §2.1). |

## Banned synonyms

Use **phase** (not “mode” for this switch). Use **stack** (not “profile”) for stack ids. Do not use **Daniel Agent Framework** — the product is **Daniels Agentic Framework** (DAF).

## Deprecated (pivot)

| Term | Was | Now |
|------|-----|-----|
| **daf** (CLI) | `daf global-setup` shell command | **`/daf-onboard`** + `scripts/global-install.mjs` |
| **Unprefixed DAF skill** | `/setup`, `/onboard`, `/issue`, … in docs or chat | **`/daf-setup`**, **`/daf-onboard`**, **`/daf-issue`**, … only |
