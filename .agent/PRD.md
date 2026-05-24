# PRD — Daniel Agent Framework (DAF) v1

## Goal

Ship a **portable agent IDE layer**: one-line global setup (`daf global-setup`) that installs consistent identity, skills, stacks, and scaffold across machines; per-repo `/setup` adapts `.agent/` so the user's IDE agent behaves the same in every project — same phases, skills, verification loop, and load order.

Primary user: **Daniel** (solo). Open source later.

## Non-goals

- **No LLM in the CLI — ever.** The CLI only copies filesystem templates; all judgment stays in the IDE agent.
- No npm publish in v1 (local install / link is enough).
- No personas, JSON `gates`, or task-folder workflows.
- No running agent sessions or prompts inside the CLI.

## v1 scope

- **CLI:** `daf global-setup [--platform generic|cursor] [--force]` only.
- **Global templates:** identity, preferences, `skill-manifest.json`, skill sources, stacks (`general`, `typescript`, `typescript-react`), scaffold subtree.
- **IDE skills:** `/setup`, `/grill-me`, `/new-feature`, `/issue`, `/improvement`, `/pivot`, `/discuss`, `/remember`, `/retro`, `/phase-transition`, `/remove`, `/remove-global`.
- **Phases:** `planning`, `developing`, `maintaining` with phase-specific rules in `.agent/phases/*.md`.
- **Platform (v1):** Cursor overlay (`--platform cursor`) — project `.cursor/rules/daf.mdc` + `~/.cursor/skills/daf-*/SKILL.md`. Stub dirs for future platforms (Claude, Codex).
- **Config contract:** `{ phase, stack, check, taskCheck, codebaseEvery, initialTaskCount, platform?, defaultBranch? }`.

## Success

1. **`npm run check` green** in this monorepo (typecheck, lint, tests covering global-install, scaffold, planning-exit, Cursor paths).
2. **Dogfood gate:** Daniel runs `daf global-setup --platform cursor`, then `/setup` on at least two real projects; agent follows load order, phase rules, and skills consistently.
3. Iterate from real usage; no separate vanity metrics for v1.
