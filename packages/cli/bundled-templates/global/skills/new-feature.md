# Skill: /daf-new-feature

**When:** `phase === "developing"` and the work adds **net-new capability** (something that did not exist in the product before).

Not for polish, refactors, or ergonomics on existing behavior — use `/daf-improvement` instead.

## Steps

1. Restate the feature in one sentence; list acceptance checks (bullets).
2. Inspect `.agent/ARCHITECTURE.md` and relevant code; note glossary terms.
3. Plan the smallest change that satisfies acceptance (files, tests) — hook into existing boundaries and patterns; no copy-paste forks of similar behavior.
4. **TDD default:** write a **failing test first** for each acceptance check that can be automated. Implement only enough code to pass; refactor when green. If automation is impractical, state why and get explicit user acceptance before skipping.
5. **Implement** per **`.agent/phases/developing.md`**: goals in session only, per-goal `config.taskCheck`, update `.agent/verify-state.json` when the session task ends, run two-phase codebase-check when due.
6. Self-review diff vs acceptance; run `/daf-retro` for non-trivial work. **Commit** committable changes per **`IDENTITY.md`** (Task endings) and phase **Task summary** before declaring done.

## Stop condition

Acceptance satisfied per the **developing** phase bar (`taskCheck` green; `config.check` when codebase-check applies) or user explicitly accepts gaps.
