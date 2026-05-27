# Daniel Agent Framework (DAF)

Lean, phase-based agent context for solo developers. **Global setup** is **`/onboard`** — installs `~/.config/agent/`, **`platforms.json`**, and native skills per IDE (`cursor`, `claude`, `codex`). **Project setup** is **`/setup`** — copies `.agent/` and merges IDE overlays for every platform in `platforms.json`.

## Quickstart

```bash
npm install
npm run build
```

**First time on this machine:**

1. Open this DAF repo in your IDE.
2. Run **`/onboard`** — pick platforms (e.g. `cursor`, `claude`, `codex`). Run **`/help`** for a short guide.
3. Optional verify: `npm run global-install -- --platforms cursor,claude,codex`

**In any project** (new or existing):

1. **`/setup`** — scaffold `.agent/`; merge `.cursor/`, `.claude/`, and repo `AGENTS.md` hooks per `platforms.json`.
2. **`/grill-me`** / **`/start`** / **`/phase-transition`** as needed.
3. **`BACKLOG.md`** / **`LOGBACK.md`** via `/backlog-add` and `/backlog-work`.

Refresh globals after template changes: **`/onboard`** again (add `--force` when overwriting).

## Monorepo layout

- [`packages/cli`](packages/cli) — `installGlobalAgent`, `applyProjectOverlays`, config helpers
- [`scripts/global-install.mjs`](scripts/global-install.mjs) — mechanical install invoked by `/onboard`
- [`templates/global`](templates/global) — identity, skills, scaffold, onboarding
- [`templates/platforms`](templates/platforms) — per-IDE global + project templates
- [`.agent/`](.agent) — this repo’s agent context

## Scripts

| Script | Meaning |
|--------|---------|
| `npm run build` | Build `packages/cli` (`tsc`) |
| `npm run check` | typecheck + lint + test |
| `npm run global-install -- --platforms cursor,claude` | Install globals (normally via `/onboard`) |

## Verification loop

`.agent/config.json` defines **taskCheck**, **check**, **codebaseEvery**, and **initialTaskCount**. See `.agent/phases/developing.md` and `.agent/phases/maintaining.md`.
