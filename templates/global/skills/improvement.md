# Skill: /improvement

**When:** Any phase in principle; **implement in `developing`** when code changes are needed. Something **already exists** and should work better — not broken (`/issue`), not **net-new capability** (`/new-feature`).

**Improvement vs new feature**

| Use `/improvement` | Use `/new-feature` |
|--------------------|--------------------|
| Refactor, clarity, performance, ergonomics on existing flows | New command, skill, phase, user journey, or capability that did not exist |
| Better errors, docs, tests, or structure around current behavior | PRD-level scope addition or v1 cut expansion |
| “Make X nicer / faster / simpler” where X exists | “Add X” where X is new to the product |
| Same mental model, better execution | `/pivot` — restructure or replace the design of X |

If the ask is net-new, stop and use `/new-feature` instead. If the design or concept itself is changing, use `/pivot`. For open exploration before you know what to build, use `/discuss` first.

## Steps

1. Restate the improvement in one sentence; list acceptance checks (bullets).
2. Read `.agent/ARCHITECTURE.md`, `.agent/GLOSSARY.md`, and relevant code or docs.
3. If scope is large or tradeoffs are unclear, propose 1–3 options briefly, then proceed with the best fit (or the user’s pick).
4. Plan the smallest change that satisfies acceptance (files, tests).
5. Prefer a failing test first when behavior is non-trivial.
6. **Implement** in `developing` following **`/task`**: per-goal `config.taskCheck`, verify-state updates, periodic codebase-check per `.agent/verify-state.json` and `codebaseEvery`.
7. Self-review diff vs acceptance; run `/retro` for non-trivial work.

## Stop condition

Acceptance satisfied per **`/task`** in `developing` or `maintaining` (or user explicitly accepts gaps). In `planning`, deliver a concrete proposal or doc edits only — defer code until `developing` or `maintaining` unless the user asks otherwise.
