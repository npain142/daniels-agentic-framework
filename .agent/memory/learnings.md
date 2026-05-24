# Learnings

Short bullets promoted from `/retro` after non-trivial work.

- **`/setup`** (**project setup**): after `daf global-setup`, **greenfield** copies scaffold into `.agent/`; **brownfield** runs inventory + interview, then merges scaffold (never overwrite healthy `config.json` without explicit intent) and populates PRD / glossary / architecture.
- `daf global-setup --platform cursor` mirrors global markdown skills into `~/.cursor/skills/daf-*/SKILL.md` using `templates/global/skill-manifest.json` and installs `~/.config/agent/platforms/cursor/project/` for the Cursor rules overlay; generic install writes the same skills as `~/.config/agent/skills/daf-*.md`.
- **`/setup`** writes `.agent/verify-state.json` from `initialTaskCount` and `codebaseEvery` in `config.json`; developing work uses `/task` to bump `taskCount` and run periodic codebase-checks.
- **`/phase-transition`** sets `config.phase` to **developing** or **maintaining** after the same planning-exit checklist as `validatePlanningExit` in `packages/cli/src/checklists/planning-to-developing.ts`.

Retro: pivot removed project-scaffold CLI commands; `/setup` + `daf global-setup` only — keep checklist text in `phase-transition` skill aligned with `planning-to-developing.ts` when thresholds change.
- Generic and Cursor installs share **`templates/global/skill-manifest.json`**; `~/.config/agent/skills/` uses **`daf-*.md`** filenames matching Cursor skill folder names.
- Retro: `/setup` reframed as **project setup** (greenfield scaffold vs brownfield interview-then-files); README and glossary distinguish **global setup** vs **project setup**.
