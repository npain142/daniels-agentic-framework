# Phase: developing

## Purpose

Build the product with a tight loop: clarify, implement, verify. Use **`maintaining`** when the work is mostly stability, fixes, and small improvements on an existing system (see `phases/maintaining.md`).

## Session task (no files)

- **Goals** live in the chat only: short bullet list at start; one clarifying question if scope is unclear.
- **Do not** write task lists or goals under `.agent/` or elsewhere.

## Definition of done (session task)

When implementing in this phase:

- Read `.agent/verify-state.json` and `config.json`. If `codebaseCheckPending` is `true`, a **codebase-check** is still owed from a prior session — run it after this task’s goals and `taskCheck` pass.
- State **goals in the chat only** (no task files under `.agent/`).
- **Per goal:** implement → run `config.taskCheck` via shell.
- **Session-level** `taskCheck` once all goals are done.
- **Session task end:** increment `taskCount` in `verify-state.json` by `1`. If **`taskCount % codebaseEvery === 0`** (and `taskCount > 0`) **or** `codebaseCheckPending` was already `true`, run **codebase-check** (below), then set `codebaseCheckPending` to `false` and set `lastCodebaseSnapshotAt` after phase A. Between codebase-checks, **`config.check`** is not required every session — see **`maintaining`** for the stricter bar.
- Behavior matches agreed intent; tests where they add real coverage.
- Read `.agent/memory/remember.md` and `.agent/memory/gotchas.md` before non-trivial edits.
- `/retro` if non-trivial.

## Codebase-check (two phases)

**Phase A — context (before `check`):** Read in order: `GLOSSARY.md` → `~/.config/agent/stacks/{stack}.md` (skip if `stack` null) → `memory/remember.md` → `memory/gotchas.md` → `memory/learnings.md` → `ARCHITECTURE.md`. Rewrite **`.agent/memory/codebase-snapshot.md`** (bounded summary: ubiquitous language, stack constraints, standing rules, traps, learnings, architecture anchors, drift/cleanup candidates). Do not run `config.check` until phase A is done.

**Phase B — implementation:** Run `config.check` via shell; fix failures; light cleanup aligned with the snapshot where cheap.

**Seeded verify-state:** If `/setup` left `codebaseCheckPending` true because `initialTaskCount` was already a multiple of `codebaseEvery`, treat codebase-check as **optional catch-up** on first session or clear `codebaseCheckPending` after explicit user deferral — do not call out snapshot or canonical doc rewrites in the reply unless the user asked.

## Allowed

- Pragmatic shortcuts: optional ADRs; incremental glossary updates.

## Forbidden

- Declaring done with a red `config.check` when codebase-check applies, without explicit user acceptance.
- Persisting session goals or task checklists to project files.
- Silent catches, undisclosed assumptions on security or data loss.

## Active skills

- `/new-feature` — clarify → plan → test → implement per this phase → review → `/retro`.
- `/issue` — reproduce → failing test → fix per this phase → regression.
- `/improvement` — enhance what exists per this phase; not net-new capability (`/new-feature`).
- `/pivot` — restructure or redesign an existing feature or concept; docs first, then implement per this phase.
- `/discuss` — explore topics or ideas; dialogue only unless user asks to implement.
- `/new-project` — scaffold for new repos (mostly `daf` + templates).
- `/remember` — append user standing instructions to `memory/remember.md`.
- `/retro` — promote notes to `memory/learnings.md` / `gotchas.md`.
- `/phase-transition` — change phase when checklists pass (`planning`, `developing`, `maintaining`).

## Merge to main

Green `config.check` when CI exists; no extra persona or release gate in v1.
