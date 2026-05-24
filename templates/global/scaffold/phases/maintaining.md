# Phase: maintaining

## Purpose

Stability and incremental improvement on an **existing** codebase: fixes, refactors, and small enhancements. Details will evolve; this file is intentionally tight in v1.

## Definition of done (session task)

Same verification loop as **developing** — follow **`/task`**: goals in chat only, per-goal `config.taskCheck`, increment `taskCount` in `verify-state.json`, periodic two-phase codebase-check when `codebaseEvery` applies. Read `memory/remember.md` and `memory/gotchas.md` before non-trivial edits.

## Allowed

- `/issue`, `/improvement`, `/pivot`, `/task`, `/discuss`, `/remember`, `/retro`
- Incremental glossary and architecture updates

## Forbidden

- Net-new product capability via **`/new-feature`** unless the user explicitly opts in for that session (then treat as exceptional; prefer moving to **developing** for sustained feature work).
- Declaring done with a red `config.check` when codebase-check applies, without explicit user acceptance.
- Persisting session goals to project files.

## Active skills

- `/task` — canonical session loop (same as developing).
- `/issue` — triage and fix bugs.
- `/improvement` — enhance existing behavior; not net-new capability.
- `/pivot` — restructure or redesign existing feature or concept.
- `/discuss` — explore ideas; no implementation unless asked.
- `/remember`, `/retro`
- `/phase-transition` — when checklists pass (e.g. back to `planning` or forward to `developing`).

## Merge to main

Green `config.check` when CI exists; no extra release gate in v1.
