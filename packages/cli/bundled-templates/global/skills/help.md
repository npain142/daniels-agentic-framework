# Skill: /daf-help

**When:** Any phase. Short DAF orientation — how it works, which skill when, how to build.

**Not:** Code deep-dive (`/daf-how-it-works`), product grill (`/daf-grill-me`), or implementation unless asked.

## Steps

1. If `.agent/config.json` exists, note current `phase` in one clause.
2. Reply with the sections below only. **Max ~35 lines.** No preamble or recap.

## Sections (use these headings)

**DAF** — Global `~/.config/agent/` + project `.agent/`; one phase in `config.json`; bar in `.agent/phases/{phase}.md`. Load: config → IDENTITY → stack → AGENTS → phase → memory; **KG-first canon** when `graphify-out/graph.json` exists (AGENTS.md §2.1).

**First run** — `daf onboard` or `/daf-onboard` (machine) → `/daf-setup` (project) → optional `/daf-grill-me` in planning → `/daf-start` or `/daf-phase-transition`.

**Build** — One session goal; `config.taskCheck` per goal; update `.agent/verify-state.json` at task end; `config.check` on codebase-check cadence (every task in **maintaining**).

**Skills**

| Use when… | Skill |
|-----------|--------|
| Machine install | `/daf-onboard` or `daf onboard` |
| Project `.agent/` | `/daf-setup` |
| PRD (planning) | `/daf-grill-me` |
| Realignment (dev) | `/daf-realign` |
| Status check | `/daf-health` or `daf health` |
| Start building | `/daf-start`, `/daf-phase-transition` |
| Net-new capability | `/daf-new-feature` |
| Bug | `/daf-issue` |
| Improve existing | `/daf-improvement` |
| Redesign existing | `/daf-pivot` |
| Think, no code | `/daf-discuss` |
| Park / do backlog | `/daf-backlog-add`, `/daf-backlog-work` (or `/daf-linear-setup` + `/daf-linear-work` when Linear is active) |
| How code works | `/daf-how-it-works` |
| External memory sync | `/daf-ltm-checkup` |
| Standing rules | `/daf-remember` |
| After work | `/daf-retro` |
| Strip project / machine | `/daf-remove`, `/daf-remove-global` |

**More** — `README.md`, `.agent/AGENTS.md`, `.agent/ARCHITECTURE.md`.

## Stop condition

Brief delivered; offer `/daf-how-it-works` if they name a topic.
