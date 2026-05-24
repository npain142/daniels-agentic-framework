# Glossary (starter)

| Term | Definition |
|------|------------|
| Phase | `planning`, `developing`, or `maintaining`; drives `.agent/phases/{phase}.md`. |
| Stack | Name under `~/.config/agent/stacks/{name}.md`; null until after **`/grill-me`** or the interview inside **brownfield `/setup`**. |
| daf | CLI: **`daf global-setup`** only (machine-wide templates + scaffold). |
| Project setup | IDE skill **`/setup`** after `daf global-setup` — greenfield or brownfield per skill. |
| taskCheck | Fast check command in `config.json` (defaults to `check` if omitted). |
| codebaseEvery | Interval for full codebase-check via `taskCount % codebaseEvery`. |
| initialTaskCount | Seeds `verify-state.json` when **`/setup`** creates verify-state. |
| defaultBranch | Optional: Git default branch name for **maintaining** branch guard; omit to infer from `origin/HEAD` or `main` (see `phases/maintaining.md`). |
| Hotfix exception | User explicitly allows fixing on the default branch without switching (see **maintaining**). |
| Maintaining bar | Branch guard, mandatory failing test when feasible, green **`config.check`** every session task end (see `phases/maintaining.md`, `/task`). |

Expand as the product grows.
