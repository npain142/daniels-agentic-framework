# Phase: developing

## Purpose

Build the product with a tight loop: clarify, implement, verify. Use **`maintaining`** when the work is mostly stability, fixes, and small improvements on an existing system (see `phases/maintaining.md`).

## Session task (no files)

- **Goals** live in the chat only: short bullet list at start; one clarifying question if scope is unclear.
- **Do not** write task lists or goals under `.agent/` or elsewhere.

## Implementation standards

Per **`~/.config/agent/IDENTITY.md`**: solve at the **root** (structure, boundary, abstraction), not with symptom patches. **Clean code → clean repo → clean product** — align with `ARCHITECTURE.md` and repo patterns; remove duplication instead of adding a second path. If the smallest honest fix is a refactor, say so briefly and do it (or split: root fix first, then acceptance) unless the user scoped a band-aid only.

## Definition of done (session task)

When implementing in this phase:

- Read `.agent/verify-state.json` and `config.json`. If `codebaseCheckPending` is `true`, a **codebase-check** is still owed from a prior session — run it after this task’s goals and `taskCheck` pass.
- State **goals in the chat only** (no task files under `.agent/`).
- **Per goal:** implement → run `config.taskCheck` via shell.
- **Session-level** `taskCheck` once all goals are done.
- **Session task end:** increment `taskCount` in `verify-state.json` by `1`. If **`taskCount % codebaseEvery === 0`** (and `taskCount > 0`) **or** `codebaseCheckPending` was already `true`, run **codebase-check** (below), then set `codebaseCheckPending` to `false` and set `lastCodebaseSnapshotAt` after phase A. Between codebase-checks, **`config.check`** is not required every session — see **`maintaining`** for the stricter bar.
- Behavior matches agreed intent; tests where they add real coverage.
- Read `.agent/memory/remember.md` and `.agent/memory/gotchas.md` before non-trivial edits.
- `/daf-retro` if non-trivial.
- **Knowledge graph:** after code changes run `npm run kg:ingest` (AST code graph). After canonical doc changes (PRD, GLOSSARY, ARCHITECTURE) run **`/daf-kg-ingest`**. Prefer `graphify query` / `graphify explain` over rereading the whole repo when `graphify-out/graph.json` exists.

## Task summary

When declaring done, give a brief wrap-up. If the session produced committable changes, end with the label **Suggested commit message:** then a fenced code block containing **only** the message text (nothing else inside the fence — one copyable field). Do not repeat the message outside the fence.

Imperative mood; match repo commit style. Omit if nothing to commit. Do not commit unless the user asks.

## Codebase-check (two phases)

**Phase A — context (before `check`):** If `graphify-out/graph.json` exists, use `graphify query` / `graphify explain` for glossary, architecture anchors, and product constraints; always read `memory/remember.md`, `memory/gotchas.md`, `memory/learnings.md`, and `~/.config/agent/stacks/{stack}.md` (skip if `stack` null). If no graph, read in order: `GLOSSARY.md` → stack → remember → gotchas → learnings → `ARCHITECTURE.md`. Rewrite **`.agent/memory/codebase-snapshot.md`** (bounded summary: ubiquitous language, stack constraints, standing rules, traps, learnings, architecture anchors, drift/cleanup candidates). Do not run `config.check` until phase A is done.

**Phase B — implementation:** Run `config.check` via shell; fix failures; light cleanup aligned with the snapshot where cheap.

**Seeded verify-state:** If `/daf-setup` left `codebaseCheckPending` true because `initialTaskCount` was already a multiple of `codebaseEvery`, treat codebase-check as **optional catch-up** on first session or clear `codebaseCheckPending` after explicit user deferral — do not call out snapshot or canonical doc rewrites in the reply unless the user asked.

## Allowed

- Pragmatic shortcuts: optional ADRs; incremental glossary updates.

## Forbidden

- Declaring done with a red `config.check` when codebase-check applies, without explicit user acceptance.
- Persisting session goals or task checklists to project files.
- Silent catches, undisclosed assumptions on security or data loss.
- Symptom-only fixes (extra flags, swallowed errors, duplicated logic) when the root cause is identifiable and fixable in scope.

## Active skills

- `/daf-help` — short DAF orientation (phases, skills, build loop).
- `/daf-start` — enter or kick off **developing** (planning exit + first session goal).
- `/daf-grill-me` — **realignment** with user vs PRD/architecture/code/backlog (not greenfield PRD grill).
- `/daf-how-it-works` — implementation-precise explanation of a code topic; no changes unless asked.
- `/daf-ltm-checkup` — reconcile `.agent/` canon with external LTM (e.g. Notion MCP).
- `/daf-new-feature` — clarify → plan → test → implement per this phase → review → `/daf-retro`.
- `/daf-issue` — reproduce → failing test → fix per this phase → regression.
- `/daf-improvement` — enhance what exists per this phase; not net-new capability (`/daf-new-feature`).
- `/daf-pivot` — restructure or redesign an existing feature or concept; docs first, then implement per this phase.
- `/daf-discuss` — explore topics or ideas; dialogue only unless user asks to implement.
- `/daf-backlog-add` — append follow-up to repo-root `BACKLOG.md`.
- `/daf-backlog-work` — pick backlog item, implement, remove from `BACKLOG.md`, archive to `LOGBACK.md` on acceptance.
- `/daf-remember` — append user standing instructions to `memory/remember.md`.
- `/daf-retro` — promote notes to `memory/learnings.md` / `gotchas.md`.
- `/daf-phase-transition` — change phase when checklists pass (`planning`, `developing`, `maintaining`).
- `/daf-kg-ingest` — merge code and canonical-doc changes into `graphify-out/`.

## Merge to main

Green `config.check` when CI exists; no extra persona or release gate in v1.
