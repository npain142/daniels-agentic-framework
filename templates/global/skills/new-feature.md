# Skill: /new-feature

**When:** `phase === "developing"` and the work adds **net-new capability** (something that did not exist in the product before).

Not for polish, refactors, or ergonomics on existing behavior — use `/improvement` instead.

## Steps

1. Restate the feature in one sentence; list acceptance checks (bullets).
2. Inspect `.agent/ARCHITECTURE.md` and relevant code; note glossary terms.
3. Plan the smallest change that satisfies acceptance (files, tests).
4. Prefer failing test first when behavior is non-trivial.
5. **Implement** following **`/task`**: goals in session only, per-goal `config.taskCheck`, update `.agent/verify-state.json` when the session task ends, run two-phase codebase-check when `taskCount % codebaseEvery === 0` or `codebaseCheckPending`.
6. Self-review diff vs acceptance; run `/retro` for non-trivial work.

## Stop condition

Acceptance satisfied per **`/task`** (`taskCheck` green; `config.check` when codebase-check applies) or user explicitly accepts gaps.
