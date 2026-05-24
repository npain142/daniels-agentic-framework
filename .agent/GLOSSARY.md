# Glossary — DAF monorepo

| Term | Definition |
|------|------------|
| **DAF** | Daniel Agent Framework — markdown-first agent context plus minimal `daf` CLI. |
| **daf** | CLI binary from `@daniels-agent-framework/cli`; v1 exposes **`daf global-setup`** only. |
| **Global context** | Files under `~/.config/agent/` (identity, preferences, skills, stacks, scaffold). |
| **Global setup** | **`daf global-setup`** — machine-wide install of global context; not per repo. |
| **Project setup** | IDE skill **`/setup`** — adapts DAF to the current repo after global setup. |
| **Scaffold** | Default `.agent/` tree at `~/.config/agent/scaffold/`; agents copy or merge via `/setup`. |
| **IDE skill** | Markdown procedure invoked as `/name` in the IDE; installed from `skill-manifest.json`. Not a shell command. |
| **Phase** | `planning`, `developing`, or `maintaining`; stored in `config.json` and `phases/*.md`. |
| **Stack** | String id matching `~/.config/agent/stacks/<id>.md`; e.g. `typescript`. |
| **Platform** | IDE integration layer; v1 ships **cursor** (`--platform cursor`). CLI wires platform assets only. |
| **Layered context** | Global (`~/.config/agent/`) composes with project (`.agent/`); higher layers override lower. |
| **taskCheck** | Fast verification command after each session goal (e.g. `npm run test`). |
| **check** | Full verification suite (e.g. `npm run check`). |
| **taskCount** | Completed session tasks in `verify-state.json`; updated at session task end per the current phase file. |
| **codebaseEvery** | Interval for two-phase codebase-check when `taskCount` hits multiples. |
| **Codebase check** | Phase A: refresh `memory/codebase-snapshot.md`; Phase B: run `config.check`. |

## Banned synonyms

Use **phase** (not “mode” for this switch). Use **stack** (not “profile”) for stack ids.
