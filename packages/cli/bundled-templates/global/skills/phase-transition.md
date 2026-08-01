# Skill: /daf-phase-transition

**When:** User asks to change **phase** in `.agent/config.json`.

Phases: `planning`, `developing`, `maintaining`. Moves are allowed when checklists pass.

## Checklist (must match `validatePlanningExit` in DAF repo)

Keep this list aligned with `packages/cli/src/checklists/planning-to-developing.ts` (thresholds and rules).

### Files present

Under `.agent/`: `PRD.md`, `GLOSSARY.md`, `ARCHITECTURE.md`, `graphify.config.json`, `phases/planning.md`, `phases/developing.md`, `phases/maintaining.md`.

### PRD.md

- At least **400** non-whitespace characters total (trimmed length check in code uses `prd.trim().length`).
- Sections **`## Goal`**, **`## Non-goals`**, **`## v1 scope`**, **`## Success`** must each have real body text: after the heading, until the next `## ` line, the text (stripped of `` ` * # - _ ``) must be **≥ 20** chars, not only `TBD`, and must not contain `tbd` (case-insensitive).

### GLOSSARY.md / ARCHITECTURE.md

- `GLOSSARY.md` trimmed length ≥ **80**.
- `ARCHITECTURE.md` trimmed length ≥ **120**.

### Knowledge graph bootstrap receipt

- `kg-bootstrap.json` exists and is valid JSON.
- `status` must be `ok`.
- `command` must mention **`graphify`** or **`kg:bootstrap`** (case-insensitive).
- `sources[]` must include `PRD.md`, `GLOSSARY.md`, and `ARCHITECTURE.md`.

### Stack

- `config.stack` must be non-null and non-empty string.
- A stack file must exist at **`~/.config/agent/stacks/{stack}.md`** **or** (for DAF repo development only) under the DAF template tree `templates/stacks/{stack}.md`. If missing, user should run **`/daf-onboard`**.

### When leaving `planning` for `developing` or `maintaining`

1. Run the **docs + stack** checklist above **except** `kg-bootstrap.json` (receipt is created in step 3).
2. If any check fails, list gaps and **do not** edit `config.json` phase.
3. **Knowledge graph bootstrap** (agent + mechanical; repo root):
   - `npm run kg:bootstrap` — code AST baseline via graphify (`graphify update .`).
   - **Domain / concept graph:** agent runs semantic extraction on bootstrap sources in `.agent/graphify.config.json` → `bootstrap.sources` (same flow as `/graphify` Part B on those files; merge into `graphify-out/`). Brownfield: merge semantic docs with existing code nodes, do not replace the code graph.
   - Optional: `npm run kg:bootstrap -- --archive-docs` before `--write-receipt` to stub canon and archive full text under `.agent/memory/canonical-archive/`.
   - `npm run kg:bootstrap -- --write-receipt` — writes `kg-bootstrap.json` when domain nodes meet `minDomainNodes`.
4. Re-run the full checklist including `kg-bootstrap.json`.
5. If all pass, set `phase` to the requested value in `.agent/config.json`.

## v1 behavior

The agent is the **mechanical writer** of `config.phase` after validation (no shell phase command in v1).
