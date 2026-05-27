# Daniel Agent Framework (DAF)

Lean, phase-based agent context for solo developers. **Global setup** is the IDE skill **`/onboard`** — the agent follows `templates/global/onboarding/global-setup.md` and runs `node scripts/global-install.mjs` from the DAF repo to install `~/.config/agent/` (skills, stacks, scaffold) and optional `~/.cursor/skills/daf-*`. **Project setup** is **`/setup`** — the agent adapts DAF to the current repo. All other procedures are markdown skills under `~/.config/agent/skills/` or `~/.cursor/skills/daf-*`.

## Quickstart

```bash
npm install
npm run build
```

**First time on this machine** — in the IDE (Cursor: skills pick up after onboard with cursor platform):

1. Open this DAF repo in your IDE.
2. Run **`/onboard`** (agent uses **cursor** platform on Cursor, **generic** elsewhere). Run **`/help`** anytime for a short framework guide.
3. Optionally verify from a terminal: `npm run global-install -- --platform cursor`

**In any project** (new or existing):

1. **`/setup`** — greenfield copies scaffold into `.agent/`; brownfield inventory + interview then merge and populate docs; optional Cursor overlay.
2. **`/grill-me`** in planning when you want a focused PRD pass (optional after greenfield `/setup`). In **developing** / **maintaining**, `/grill-me` is **realignment**.
3. **`/start`** or **`/phase-transition`** when planning exit criteria pass.
4. Repo-root **`BACKLOG.md`** / **`LOGBACK.md`** via `/backlog-add` and `/backlog-work`.

Refresh globals after template changes: **`/onboard`** again (add force when overwriting).

## Monorepo layout

- [`packages/cli`](packages/cli) — install library (`installGlobalAgent`, config/verify-state helpers, planning-exit checklist); no `daf` binary
- [`scripts/global-install.mjs`](scripts/global-install.mjs) — mechanical install invoked by `/onboard`
- [`templates/global`](templates/global) — identity, `skill-manifest.json`, `skills/*.md`, `onboarding/global-setup.md`, `scaffold/`
- [`templates/stacks`](templates/stacks) — stack conventions
- [`templates/platforms/cursor`](templates/platforms/cursor) — Cursor project overlay + skill packaging
- [`.agent/`](.agent) — this repo’s own agent context

## Scripts

| Script | Meaning |
|--------|---------|
| `npm run build` | Build `packages/cli` (`tsc`) |
| `npm run check` | typecheck + lint + test |
| `npm run global-install -- --platform cursor` | Copy globals (agent normally runs this during `/onboard`) |

## Verification loop

`.agent/config.json` defines **taskCheck**, **check**, **codebaseEvery**, and **initialTaskCount** (seeds `verify-state.json` on `/setup`). See `.agent/phases/developing.md` and `.agent/phases/maintaining.md`.
