# PRD — Daniels Agentic Framework (DAF) v1

## Goal

Ship a **portable agent IDE layer**: **`/daf-onboard`** installs consistent identity, skills, stacks, and scaffold across machines; per-repo **`/daf-setup`** adapts `.agent/` so the user's IDE agent behaves the same in every project — same phases, skills, verification loop, and load order.

Primary user: **Daniel** (solo). Open source later.

## Non-goals

- **No LLM in install tooling — ever.** Install scripts only copy/transform filesystem templates; all judgment stays in the IDE agent.
- No npm publish in v1 (local clone / link is enough).
- No personas, JSON `gates`, or task-folder workflows.
- No `daf` shell CLI — global setup is **`/daf-onboard`** plus `scripts/global-install.mjs` when mechanical copy is needed.

## v1 scope

- **Global setup:** IDE skill **`/daf-onboard`** + onboarding script + `node scripts/global-install.mjs [--platforms generic,cursor,claude,codex] [--force]`; writes **`~/.config/agent/platforms.json`**.
- **Global templates:** identity, preferences, `skill-manifest.json`, skill sources, stacks (`general`, `typescript`, `typescript-react`), scaffold subtree, onboarding script.
- **IDE skills:** `/daf-onboard`, `/daf-setup`, `/daf-help`, `/daf-grill-me`, `/daf-start`, `/daf-how-it-works`, `/daf-ltm-checkup`, `/daf-new-feature`, `/daf-issue`, `/daf-improvement`, `/daf-pivot`, `/daf-discuss`, `/daf-backlog-add`, `/daf-backlog-work`, `/daf-remember`, `/daf-retro`, `/daf-phase-transition`, `/daf-kg-ingest`, `/daf-remove`, `/daf-remove-global`.
- **Knowledge graph:** Graphify-backed `graphify-out/`; domain graph at planning exit; code graph grows in developing (`npm run kg:ingest`, `/daf-kg-ingest`).
- **Backlog / logback:** repo-root `BACKLOG.md` (`/daf-backlog-add`, `/daf-backlog-work`); completed items archive to `LOGBACK.md` with fading prune; greenfield `/daf-setup` seeds from `root-BACKLOG.md` and `root-LOGBACK.md`.
- **Phases:** `planning`, `developing`, `maintaining` with phase-specific rules in `.agent/phases/*.md`.
- **Platforms (v1):** Multi-select at **`/daf-onboard`** — native global skills per IDE (`cursor`, `claude`, `codex`) + flat `$G/skills/`; **`/daf-setup`** merges project overlays from `$G/platforms/<id>/project/` for every id in **`platforms.json`**.
- **Config contract (committed):** `{ phase, stack, check, taskCheck, codebaseEvery, initialTaskCount, defaultBranch? }`.
- **Machine-wide:** `~/.config/agent/platforms.json` → `{ platforms: string[] }` (not in the repo).

## Success

1. **`npm run check` green** in this monorepo (typecheck, lint, tests covering global install, scaffold, planning-exit, Cursor paths).
2. **Dogfood gate:** Daniel runs **`/daf-onboard`** with cursor platform, then **`/daf-setup`** on at least two real projects; agent follows load order, phase rules, and skills consistently.
3. Iterate from real usage; no separate vanity metrics for v1.
