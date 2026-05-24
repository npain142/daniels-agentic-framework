# Phase: developing

## Purpose

Build the product with a tight loop: clarify, implement, verify. Use **`maintaining`** when the work is mostly stability, fixes, and small improvements on an existing system (see `phases/maintaining.md`).

## Definition of done (session task)

When implementing in this phase:

- Read `.agent/verify-state.json` and `config.json`; state **goals in the chat only** (no task files under `.agent/`).
- **Per goal:** implement → run `config.taskCheck` via shell.
- **Session task end:** increment `taskCount` in `verify-state.json`. If `taskCount % codebaseEvery === 0` (with `taskCount > 0`) or `codebaseCheckPending` is true, run **two-phase codebase-check** before declaring done: **Phase A** — rewrite `.agent/memory/codebase-snapshot.md` from GLOSSARY, stack, memory files, and ARCHITECTURE (order in `/task`); **Phase B** — run `config.check`, fix failures, light cleanup. Then clear `codebaseCheckPending` and set `lastCodebaseSnapshotAt` after phase A.
- Behavior matches agreed intent; tests where they add real coverage.
- Read `.agent/memory/remember.md` and `.agent/memory/gotchas.md` before non-trivial edits.

## Allowed

- Pragmatic shortcuts: optional ADRs; incremental glossary updates.

## Forbidden

- Declaring done with a red `config.check` when codebase-check applies, without explicit user acceptance.
- Persisting session goals or task checklists to project files.
- Silent catches, undisclosed assumptions on security or data loss.

## Active skills

- `/task` — session goals, `taskCheck`, verify-state, periodic codebase-check (two phases).
- `/new-feature` — clarify → plan → test → implement via `/task` → review → `/retro`.
- `/issue` — reproduce → failing test → fix via `/task` → regression.
- `/improvement` — enhance what exists; implement via `/task`; not net-new capability (`/new-feature`).
- `/pivot` — restructure or redesign an existing feature or concept; docs first, then `/task`.
- `/discuss` — explore topics or ideas; dialogue only unless user asks to implement.
- `/new-project` — scaffold for new repos (mostly `daf` + templates).
- `/remember` — append user standing instructions to `memory/remember.md`.
- `/retro` — promote notes to `memory/learnings.md` / `gotchas.md`.
- `/phase-transition` — change phase when checklists pass (`planning`, `developing`, `maintaining`).

## Merge to main

Green `config.check` when CI exists; no extra persona or release gate in v1.
