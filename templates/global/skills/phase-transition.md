# Skill: /phase-transition

**When:** User asks to change **phase** in `.agent/config.json`.

Phases: `planning`, `developing`, `maintaining`. Moves are allowed when checklists pass.

## Checklist (must match `validatePlanningExit` in DAF repo)

Keep this list aligned with `packages/cli/src/checklists/planning-to-developing.ts` (thresholds and rules).

### Files present

Under `.agent/`: `PRD.md`, `GLOSSARY.md`, `ARCHITECTURE.md`, `phases/planning.md`, `phases/developing.md`, `phases/maintaining.md`.

### PRD.md

- At least **400** non-whitespace characters total (trimmed length check in code uses `prd.trim().length`).
- Sections **`## Goal`**, **`## Non-goals`**, **`## v1 scope`**, **`## Success`** must each have real body text: after the heading, until the next `## ` line, the text (stripped of `` ` * # - _ ``) must be **≥ 20** chars, not only `TBD`, and must not contain `tbd` (case-insensitive).

### GLOSSARY.md / ARCHITECTURE.md

- `GLOSSARY.md` trimmed length ≥ **80**.
- `ARCHITECTURE.md` trimmed length ≥ **120**.

### Stack

- `config.stack` must be non-null and non-empty string.
- A stack file must exist at **`~/.config/agent/stacks/{stack}.md`** **or** (for DAF repo development only) under the DAF template tree `templates/stacks/{stack}.md`. If missing, user should run **`daf global-setup`**.

### When leaving `planning` for `developing` or `maintaining`

1. Run the checklist above.
2. If any check fails, list gaps and **do not** edit `config.json` phase.
3. If all pass, set `phase` to the requested value in `.agent/config.json`.

## v1 behavior

The agent is the **mechanical writer** of `config.phase` after validation (there is no `daf phase` command in v1).
