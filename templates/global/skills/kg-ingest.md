# Skill: /daf-kg-ingest

**When:** **developing** or **maintaining** — after code or canonical doc changes, merge new knowledge into the project knowledge graph (`graphify-out/`).

**Not:** Initial domain graph at planning exit (use **`/daf-phase-transition`** bootstrap). Full greenfield `/graphify` on the whole repo unless ingest is insufficient.

## Two layers (DAF model)

| Layer | When | How |
|-------|------|-----|
| **Domain / concept graph** | Planning exit → developing; when PRD, GLOSSARY, ARCHITECTURE, or phase rules change materially | Semantic extraction on `.agent/` bootstrap sources (see `graphify.config.json`) — agent `/graphify` pass or `graphify extract` if API key set |
| **Code graph** | Every developing session with code edits | `npm run kg:ingest` → `graphify update .` (AST, no LLM) |

Merged graph lives in **`graphify-out/graph.json`**. Query with `graphify query`, `graphify path`, `graphify explain` (see `.cursor/rules/graphify.mdc` when Cursor is onboarded).

## Your job

1. Read `.agent/graphify.config.json` and `graphify-out/needs_update` if present.
2. **Mechanical (always):** from repo root run `npm run kg:ingest`.
   - Exit `2` or `needs_update` flag → canonical or non-code files need semantic re-extraction.
3. **Semantic (when needed):** run **`/graphify --update`** on the repo, or re-extract only files listed in `graphify.config.json` → `bootstrap.sources` / `ingest.canonicalSources` when only canon changed.
4. After semantic merge, run `npm run kg:ingest` again to refresh code AST and clear flags when possible.
5. If canonical stubs are live (archived at transition), update **archive** copies under `.agent/memory/canonical-archive/` when editing full text, then re-ingest.

## Hard rules

- Do not skip `kg:ingest` after non-trivial code changes in a session task when the graph is the project's navigation source.
- Do not invent graph nodes — extraction must come from graphify or documented agent semantic pass per graphify skill schema.
- Install tooling (`kg:*` scripts) does not call LLMs; semantic passes are agent- or `graphify extract`-driven.

## Stop condition

- `graphify-out/graph.json` reflects current code (AST) and canonical docs (semantic when canon changed).
- `graphify check-update .` reports no pending semantic work, or user explicitly defers doc ingest.
