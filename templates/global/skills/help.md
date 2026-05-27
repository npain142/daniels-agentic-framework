# Skill: /help

**When:** Any phase. Short DAF orientation — how it works, which skill when, how to build.

**Not:** Code deep-dive (`/how-it-works`), product grill (`/grill-me`), or implementation unless asked.

## Steps

1. If `.agent/config.json` exists, note current `phase` in one clause.
2. Reply with the sections below only. **Max ~35 lines.** No preamble or recap.

## Sections (use these headings)

**DAF** — Global `~/.config/agent/` + project `.agent/`; one phase (`planning` | `developing` | `maintaining`) in `config.json`; bar in `.agent/phases/{phase}.md`. Load: config → IDENTITY → stack → AGENTS → phase → GLOSSARY → memory.

**First run** — `/onboard` (machine) → `/setup` (project) → optional `/grill-me` in planning → `/start` or `/phase-transition`.

**Build** — One session goal; `config.taskCheck` per goal; update `.agent/verify-state.json` at task end; `config.check` on codebase-check cadence (every task in **maintaining**).

**Skills**

| Use when… | Skill |
|-----------|--------|
| Machine install | `/onboard` |
| Project `.agent/` | `/setup` |
| PRD / realignment | `/grill-me` |
| Start building | `/start`, `/phase-transition` |
| Net-new capability | `/new-feature` |
| Bug | `/issue` |
| Improve existing | `/improvement` |
| Redesign existing | `/pivot` |
| Think, no code | `/discuss` |
| Park / do backlog | `/backlog-add`, `/backlog-work` |
| How code works | `/how-it-works` |
| External memory sync | `/ltm-checkup` |
| Standing rules | `/remember` |
| After work | `/retro` |
| Strip project / machine | `/remove`, `/remove-global` |

**More** — `README.md`, `.agent/AGENTS.md`, `.agent/ARCHITECTURE.md`.

## Stop condition

Brief delivered; offer `/how-it-works` if they name a topic.
