# Phase: maintaining

## Purpose

Stability and incremental improvement on an **existing** codebase: fixes, refactors, and small enhancements. Stricter than **developing**: branch guard, mandatory testing when feasible, and full `config.check` every session task.

## Branch guard

Before the **first** edit in a session task:

1. Run `git rev-parse --abbrev-ref HEAD` (or equivalent) for the current branch name.
2. Resolve the protected name, in order:
   - If **`config.defaultBranch`** is set in `.agent/config.json` → use it (trimmed).
   - Else if `git symbolic-ref --short refs/remotes/origin/HEAD` succeeds → use the branch name after `origin/` (e.g. `main`, `master`).
   - Else assume **`main`** (set **`defaultBranch`** in config if that guess is wrong).
3. If the current branch equals that protected name, **stop** and tell the user to create or switch to a topic branch (e.g. `git switch -c fix/short-description` or `git switch existing-branch`). Do not edit until off the default branch.

**Hotfix exception:** if the user explicitly opts in (e.g. “hotfix on main”), skip the stop and proceed on the default branch.

## Session scope

Prefer **one** focused outcome per session task (one bug, one small improvement). No drive-by refactors or broad rewrites without explicit user agreement.

## Session task (no files)

- **Goals** live in the chat only: short bullet list at start; one clarifying question if scope is unclear.
- **Do not** write task lists or goals under `.agent/` or elsewhere.

## Testing bar

- **Reproduce** with exact steps, expected vs actual.
- **Failing automated test** before the fix when feasible; add **regression** coverage for every behavior change. The user may waive only with **explicit** acceptance in the session.
- Follow **`/issue`** when triaging bugs.

## Definition of done (session task)

- Read `.agent/verify-state.json` and `config.json`. If `codebaseCheckPending` is `true`, a **codebase-check** is still owed — run it per the end-of-task rules below.
- Goals in chat only; per-goal `config.taskCheck`; read `memory/remember.md` and `memory/gotchas.md` before non-trivial edits.
- **Session-level** `taskCheck` once all goals are done.

**Session task end (stricter than developing):** let **`next = taskCount + 1`**.

- If **`next % codebaseEvery === 0`** (and `next > 0`) **or** `codebaseCheckPending` is `true`: run **codebase-check** (Phase A then Phase B — same order and snapshot rules as `phases/developing.md`), then set **`taskCount`** to **`next`**, `codebaseCheckPending` to `false`, and `lastCodebaseSnapshotAt` after phase A.
- **Else:** run **`config.check`** via shell until green, then set **`taskCount`** to **`next`**.

Never declare done with a red `config.check` without explicit user acceptance.

## Task summary

When declaring done, give a brief wrap-up. If the session produced committable changes, end with the label **Suggested commit message:** then a fenced code block containing **only** the message text (nothing else inside the fence — one copyable field). Do not repeat the message outside the fence.

Imperative mood; match repo commit style. Omit if nothing to commit. Do not commit unless the user asks.

## Allowed

- `/issue`, `/improvement`, `/pivot`, `/discuss`, `/remember`, `/retro`
- Incremental glossary and architecture updates

## Forbidden

- Net-new product capability via **`/new-feature`** unless the user explicitly opts in for that session (then treat as exceptional; prefer moving to **developing** for sustained feature work).
- Declaring done without green **`config.check`** (unless the user explicitly accepts documented gaps).
- Editing on the default branch without **hotfix** opt-in.
- Persisting session goals to project files.

## Active skills

- `/issue` — triage and fix bugs; failing test mandatory in maintaining unless user waives.
- `/improvement` — enhance existing behavior; not net-new capability.
- `/pivot` — restructure or redesign existing feature or concept.
- `/discuss` — explore ideas; no implementation unless asked.
- `/remember`, `/retro`
- `/phase-transition` — when checklists pass (e.g. back to `planning` or forward to `developing`).

## Merge to main

Green `config.check` when CI exists; work is done off the default branch unless a documented hotfix exception applies; no extra release gate in v1.
