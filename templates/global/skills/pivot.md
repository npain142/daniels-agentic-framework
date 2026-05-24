# Skill: /pivot

**When:** Any phase. The developer **commits to changing** how an existing feature, concept, module, or product area is **structured or designed** — not just polishing it (`/improvement`) and not adding capability that did not exist before (`/new-feature`).

**Pivot vs other skills**

| Use `/pivot` | Use instead |
|--------------|-------------|
| Rearchitect a module, API shape, or data model | `/improvement` — same design, better quality |
| Rename, merge, split, or replace an existing capability | `/new-feature` — net-new to the product |
| Replace a glossary concept or user journey with a new model | `/discuss` — still exploring whether to change |
| Align PRD, ARCHITECTURE, and code to a new direction | `/phase-transition` — only changing `phase` |
| Adopt DAF on an existing repo | `/daf-migrate` — scaffold and align docs, not product redesign |

If unsure whether to pivot, use `/discuss` first.

## Steps

1. **From → to:** one sentence each; list what is deprecated, renamed, or removed (bullets).
2. Read `.agent/PRD.md`, `ARCHITECTURE.md`, `GLOSSARY.md`, and affected code or docs.
3. **Blast radius:** files, public APIs, tests, migrations, user-visible behavior.
4. **Canonical docs first** (before large code churn): update `GLOSSARY.md` (propose terms), `ARCHITECTURE.md`, and `PRD.md` sections if product meaning changed.
5. **Migration plan:** incremental vs big-bang; compatibility shims; order of operations; risks.
6. **`planning`:** stop after docs + plan unless the user asks for code. **`developing`** or **`maintaining`:** implement via **`/task`** (goals in session, `taskCheck`, verify-state, codebase-check when due).
7. Remove or quarantine dead paths; update tests to the new model.
8. `/retro` for non-trivial pivots (note migration gotchas in `memory/gotchas.md` when relevant).

## Stop condition

The new design is reflected in canonical docs; in `developing` or `maintaining`, code and tests match the plan, verification per **`/task`** (or user accepts documented gaps). The old concept is removed or explicitly deprecated with a removal path.
