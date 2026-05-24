# Daniel Agent Framework (DAF)

Lean, phase-based agent context for solo developers. **Global setup** is **`daf global-setup`** — it copies global context (including **`skill-manifest.json`**, **`skills/daf-*.md`**, stacks, and **scaffold**) into `~/.config/agent/`. **Project setup** is the IDE skill **`/setup`** — it adapts DAF to the current repo (not a shell command). Other procedures use markdown skills under `~/.config/agent/skills/` or `~/.cursor/skills/daf-*`.

## Quickstart

```bash
npm install
npm run build
npm run daf -- --help
```

**First time on this machine** — install globals (add **`--platform cursor`** on Cursor for `~/.cursor/skills/daf-*` and the Cursor project overlay template under `~/.config/agent/platforms/cursor/project/`):

```bash
npm run daf -- global-setup
# or:
# npm run daf -- global-setup --platform cursor
```

**In any project** (new or existing):

1. **Machine once (global setup):** run **`daf global-setup`** from a terminal (see above). That installs `~/.config/agent/` (scaffold, `daf-*.md` skills, etc.).
2. **Per repo (project setup):** in the IDE, invoke **`/setup`**. The agent chooses the path:
   - **Greenfield:** copy scaffold into `.agent/`, `verify-state.json`, optional Cursor overlay. **`/grill-me`** afterward is optional when you want to lock the PRD.
   - **Brownfield:** inventory and interview (same minimum as **`/grill-me`**) until you share a mental model, then merge scaffold (missing paths only; never overwrite a healthy `config.json` without explicit intent), populate PRD / glossary / architecture from that session, then `verify-state` and optional Cursor overlay.

Then:

- **`/grill-me`** in planning when `.agent/` exists and you want a focused PRD pass (or to iterate the PRD); agent sets **`config.stack`** after agreement when not already set in brownfield **`/setup`**.
- **`/phase-transition`** when planning exit criteria pass (same checklist as `validatePlanningExit` in this repo).

If you use **pnpm**, add a script mirroring `npm run daf` or run `pnpm exec` against the workspace CLI after `pnpm install`.

## Monorepo layout

- [`packages/cli`](packages/cli) — `daf` implementation (`daf global-setup` only)
- [`templates/global`](templates/global) — identity, preferences, **`skill-manifest.json`**, `skills/{id}.md` sources, **`daf-*.md`** output under `~/.config/agent/skills/`, **`scaffold/`** (installed to `~/.config/agent/scaffold/`)
- [`templates/stacks`](templates/stacks) — stack conventions
- [`templates/platforms/cursor`](templates/platforms/cursor) — Cursor project `.cursor/rules` overlay (skills use the same manifest as generic)
- [`templates/platforms/claude`](templates/platforms/claude), [`templates/platforms/codex`](templates/platforms/codex) — stubs for future installers
- [`.agent/`](.agent) — this repo’s own agent context

## Scripts

| Script | Meaning |
|--------|---------|
| `npm run build` | Build the CLI (`tsc`) |
| `npm run check` | typecheck + lint + test |
| `npm run daf` | Run the workspace `daf` binary (see `package.json` script) |

## Verification loop

`.agent/config.json` defines **`taskCheck`** (fast, e.g. tests) and **`check`** (full suite). **`codebaseEvery`** sets how often a two-phase **codebase-check** runs after completed session tasks (see `/task`). **`initialTaskCount`** seeds `.agent/verify-state.json` when **`/setup`** creates verify-state. Agents follow **`/task`** — goals stay in the session; `verify-state.json` tracks `taskCount` and pending flags.

**Maintaining** adds a stricter bar: branch guard before edits, mandatory failing test when feasible for bugfixes, and green **`config.check`** after every session task (see [`.agent/phases/maintaining.md`](.agent/phases/maintaining.md)).
