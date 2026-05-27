# Glossary — DAF monorepo

| Term | Definition |
|------|------------|
| **DAF** | Daniel Agent Framework — markdown-first agent context; skills-only install (no `daf` CLI). |
| **Global context** | Files under `~/.config/agent/` (identity, preferences, skills, stacks, scaffold, onboarding script). |
| **Global setup** | IDE skill **`/onboard`** — machine-wide install of global context; not per repo. |
| **Onboarding script** | `templates/global/onboarding/global-setup.md` (also installed under `~/.config/agent/onboarding/`). |
| **Project setup** | IDE skill **`/setup`** — adapts DAF to the current repo after global setup. |
| **Scaffold** | Default `.agent/` tree at `~/.config/agent/scaffold/`; agents copy or merge via `/setup`. |
| **IDE skill** | Markdown procedure invoked as `/name` in the IDE; installed from `skill-manifest.json`. Not a shell command. |
| **Phase** | `planning`, `developing`, or `maintaining`; stored in `config.json` and `phases/*.md`. |
| **Stack** | String id matching `~/.config/agent/stacks/<id>.md`; e.g. `typescript`. |
| **Platform** | IDE integration layer: `generic`, `cursor`, `claude`, `codex`. Chosen at **`/onboard`**; listed in **`~/.config/agent/platforms.json`**. |
| **platforms.json** | Machine-wide registry at `$G/platforms.json` — which IDEs were onboarded; **`/setup`** applies project overlays for each listed id. |
| **Layered context** | Global (`~/.config/agent/`) composes with project (`.agent/`); higher layers override lower. |
| **taskCheck** | Fast verification command after each session goal (e.g. `npm run test`). |
| **check** | Full verification suite (e.g. `npm run check`). |
| **taskCount** | Completed session tasks in `verify-state.json`; updated at session task end per the current phase file. |
| **codebaseEvery** | Interval for two-phase codebase-check when `taskCount` hits multiples. |
| **Codebase check** | Phase A: refresh `memory/codebase-snapshot.md`; Phase B: run `config.check`. |
| **Task summary** | Brief wrap-up when declaring done after a session task; may end with **Suggested commit message:** and a fenced code block (message only inside) when there are committable changes. |
| **Backlog** | Open follow-ups at repo root in `BACKLOG.md` (`## Open`, optional `## In progress`); not session goals in `.agent/`. Managed via `/backlog-add` and `/backlog-work`. |
| **Logback** | Fading archive at repo root in `LOGBACK.md`: short artifacts from completed backlog items; auto-pruned (7d untagged, 14d tagged, `#keep` retained). |
| **Realignment** | `/grill-me` in **developing** or **maintaining**: resync user intent with PRD, architecture, code, and backlog. |
| **LTM** | Long-term memory outside `.agent/` (e.g. Notion); reconciled via `/ltm-checkup`. |

## Banned synonyms

Use **phase** (not “mode” for this switch). Use **stack** (not “profile”) for stack ids.

## Deprecated (pivot)

| Term | Was | Now |
|------|-----|-----|
| **daf** (CLI) | `daf global-setup` shell command | **`/onboard`** + `scripts/global-install.mjs` |
