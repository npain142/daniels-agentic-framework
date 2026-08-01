# Skill: /daf-improvement

**When:** Any phase in principle; **implement in `developing`** when code changes are needed. Something **already exists** and should work better — not broken (`/daf-issue`), not **net-new capability** (`/daf-new-feature`).

**Improvement vs new feature**

| Use `/daf-improvement` | Use `/daf-new-feature` |
|--------------------|--------------------|
| Refactor, clarity, performance, ergonomics on existing flows | New command, skill, phase, user journey, or capability that did not exist |
| Better errors, docs, tests, or structure around current behavior | PRD-level scope addition or v1 cut expansion |
| “Make X nicer / faster / simpler” where X exists | “Add X” where X is new to the product |
| Same mental model, better execution | `/daf-pivot` — restructure or replace the design of X |

If the ask is net-new, stop and use `/daf-new-feature` instead. If the design or concept itself is changing, use `/daf-pivot`. For open exploration before you know what to build, use `/daf-discuss` first.

**Root over workaround:** improve the **canonical** place (module, API, shared helper) — do not add a parallel path or copy-pasted variant to avoid touching messy code. If the improvement exposes a deeper flaw, fix or propose fixing the root (may overlap `/daf-issue` or `/daf-pivot`).

## Steps

1. Restate the improvement in one sentence; list acceptance checks (bullets).
2. Load context **KG-first** (`.agent/AGENTS.md` §2.1), then read relevant code or docs the graph cites or you will change.
3. If scope is large or tradeoffs are unclear, propose 1–3 options briefly, then proceed with the best fit (or the user’s pick).
4. Plan the smallest change that satisfies acceptance **at the root** (files, tests) — match repo patterns; no duplicate logic.
5. Prefer a failing test first when behavior is non-trivial.
6. **Implement** in `developing` or `maintaining` per **`.agent/phases/{phase}.md`**: per-goal `config.taskCheck`, verify-state updates, periodic codebase-check when due.
7. Self-review diff vs acceptance; run `/daf-retro` for non-trivial work. **Commit** committable changes per **`IDENTITY.md`** (Task endings) and phase **Task summary** before declaring done.

## Stop condition

Acceptance satisfied per the current phase bar in `developing` or `maintaining` (or user explicitly accepts gaps). In `planning`, deliver a concrete proposal or doc edits only — defer code until `developing` or `maintaining` unless the user asks otherwise.
