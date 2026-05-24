# Skill: /task

**When:** `phase === "developing"` and the agent is doing **implementing** work with the user (any session task that changes code, tests, or product behavior). Prefer this over ad-hoc flows for `/new-feature`, `/issue`, `/improvement`, and `/pivot`.

## Session task (no files)

- **Goals** live in the chat only: short bullet list at start; one clarifying question if scope is unclear.
- **Do not** write task lists or goals under `.agent/` or elsewhere.

## Verification files (disk)

1. **`.agent/config.json`** — `taskCheck` (fast loop), `check` (full), `codebaseEvery` (modulo interval; set at `/setup` / scaffold).
2. **`.agent/verify-state.json`** — `taskCount` (monotonic total of completed session tasks), `codebaseCheckPending`, `lastCodebaseSnapshotAt`. The agent updates this JSON when a session task **ends** (small edits only; never change `codebaseEvery` in config here).

## Steps

1. Read `.agent/verify-state.json` and `.agent/config.json`. If `codebaseCheckPending` is `true`, a **codebase-check** is still owed from a prior session — run it after this task’s goals and `taskCheck` pass.
2. State goals in the session (bullets). Optionally note `taskCount` and the next codebase-check milestone (next multiple of `codebaseEvery` after this task completes).
3. **Per goal:** implement → run `config.taskCheck` via shell → confirm in session.
4. **Session-level** `taskCheck` once all goals are done.
5. **End of session task:** increment `taskCount` in `verify-state.json` by `1`.
6. If **`taskCount % codebaseEvery === 0`** (and `taskCount > 0`) **or** `codebaseCheckPending` was already `true`, run **codebase-check** (below), then set `codebaseCheckPending` to `false` and set `lastCodebaseSnapshotAt` after phase A.
7. `/retro` if non-trivial.

## Codebase-check (two phases)

**Phase A — context (before `check`):** Read in order: `GLOSSARY.md` → `~/.config/agent/stacks/{stack}.md` (skip if `stack` null) → `memory/remember.md` → `memory/gotchas.md` → `memory/learnings.md` → `ARCHITECTURE.md`. Rewrite **`.agent/memory/codebase-snapshot.md`** (bounded summary: ubiquitous language, stack constraints, standing rules, traps, learnings, architecture anchors, drift/cleanup candidates). Do not run `config.check` until phase A is done.

**Phase B — implementation:** Run `config.check` via shell; fix failures; light cleanup aligned with the snapshot where cheap.

**Seeded verify-state:** If `/setup` left `codebaseCheckPending` true because `initialTaskCount` was already a multiple of `codebaseEvery`, treat codebase-check as **optional catch-up** on first session or clear `codebaseCheckPending` after explicit user deferral — do not call out snapshot or canonical doc rewrites in the reply unless the user asked.

## Stop condition

Goals satisfied, `taskCheck` green, `verify-state.json` updated, and when required, codebase-check phase A + B complete with `check` green (or user explicitly accepts gaps).
