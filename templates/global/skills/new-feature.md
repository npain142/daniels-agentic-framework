# Skill: /daf-new-feature

**When:** `phase === "developing"` and the work adds **net-new capability** (something that did not exist in the product before).

Not for polish, refactors, or ergonomics on existing behavior — use `/daf-improvement` instead.

## Steps

1. Restate the feature in one sentence; list acceptance checks (bullets).
2. Inspect `.agent/ARCHITECTURE.md` and relevant code; note glossary terms.
3. Plan the smallest change that satisfies acceptance (files, tests) — hook into existing boundaries and patterns; no copy-paste forks of similar behavior.
4. Prefer failing test first when behavior is non-trivial.
5. **Implement** per **`.agent/phases/developing.md`**: goals in session only, per-goal `config.taskCheck`, update `.agent/verify-state.json` when the session task ends, run two-phase codebase-check when due.
6. Self-review diff vs acceptance; run `/daf-retro` for non-trivial work. When declaring done, add **Suggested commit message:** and a fenced code block (message only) if there are committable changes (see phase **Task summary**).

## Stop condition

Acceptance satisfied per the **developing** phase bar (`taskCheck` green; `config.check` when codebase-check applies) or user explicitly accepts gaps.
