# Skill: /daf-pivot

**When:** Any phase. The developer **commits to changing** how an existing feature, concept, module, or product area is **structured or designed** — not just polishing it (`/daf-improvement`) and not adding capability that did not exist before (`/daf-new-feature`).

**Pivot vs other skills**

| Use `/daf-pivot` | Use instead |
|--------------|-------------|
| Rearchitect a module, API shape, or data model | `/daf-improvement` — same design, better quality |
| Rename, merge, split, or replace an existing capability | `/daf-new-feature` — net-new to the product |
| Replace a glossary concept or user journey with a new model | `/daf-discuss` — still exploring whether to change |
| Align PRD, ARCHITECTURE, and code to a new direction | `/daf-phase-transition` — only changing `phase` |
| Adopt DAF on an existing repo | `/daf-setup` (brownfield) — scaffold and align docs, not product redesign |

If unsure whether to pivot, use `/daf-discuss` first.

## Steps

1. **From → to:** one sentence each; list what is deprecated, renamed, or removed (bullets).
2. Load canon **KG-first** (`.agent/AGENTS.md` §2.1), then read affected source paths the graph cites or you will edit.
3. **Blast radius:** files, public APIs, tests, migrations, user-visible behavior.
4. **Canonical docs first** (before large code churn): update `GLOSSARY.md` (propose terms), `ARCHITECTURE.md`, and `PRD.md` sections if product meaning changed.
5. **KG update:** run **`/daf-kg-ingest`** (agent: `npm run kg:ingest` + semantic pass when canon changed); update archive if stubs are live; mark deprecated concepts with explicit replacement edges in canonical/archive docs before ingest.
6. **Migration plan:** incremental vs big-bang; compatibility shims; order of operations; risks.
7. **`planning`:** stop after docs + plan (+ KG bootstrap plan) unless the user asks for code. **`developing`** or **`maintaining`:** implement per **`.agent/phases/{phase}.md`** (goals in session, `taskCheck`, verify-state, codebase-check when due).
8. Remove or quarantine dead paths; update tests and KG mappings to the new model.
9. `/daf-retro` for non-trivial pivots (note migration gotchas in `memory/gotchas.md` when relevant).

## Stop condition

The new design is reflected in canonical docs and latest Graphify bootstrap receipt; in `developing` or `maintaining`, code and tests match the plan, verification per the current phase bar (or user accepts documented gaps). The old concept is removed or explicitly deprecated with a removal path.
