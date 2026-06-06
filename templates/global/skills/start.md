# Skill: /daf-start

**When:** User is ready to **begin developing** after planning — first build session or returning to `developing` from `planning`.

**Not:** Net-new product interviews (`/daf-grill-me` in planning), generic phase changes without kickoff (`/daf-phase-transition` alone), or implementation of backlog items (use `/daf-new-feature`, `/daf-improvement`, etc.).

## Your job

1. Read `.agent/config.json` and planning exit criteria (same checklist as **`/daf-phase-transition`** — keep aligned with `validatePlanningExit` in the DAF repo).
2. If `phase === "planning"`:
   - Run the planning-exit checklist for docs and stack (same as **`/daf-phase-transition`**).
   - Run the **KG bootstrap** sequence from **`/daf-phase-transition`** (`kg:bootstrap` → semantic domain graph → `kg:bootstrap -- --write-receipt`) when `kg-bootstrap.json` is missing or stale vs canonical fingerprints.
   - Re-validate full checklist including `kg-bootstrap.json`; if any check fails, list gaps and **stop** (do not change phase).
   - If all pass, set `phase` to `"developing"` in `.agent/config.json`.
3. If `phase` is already `developing` or `maintaining`, confirm with the user they want a **developing kickoff** (not a phase change); skip checklist unless they asked to re-validate planning exit.
4. **Kickoff (developing session):**
   - Read `.agent/verify-state.json`. Orient via **KG-first** (`.agent/AGENTS.md` §2.1): `graphify query` for product goal, v1 scope, and architecture — not bulk reads of PRD/ARCHITECTURE/GLOSSARY when `graphify-out/graph.json` exists.
   - Read repo-root **`BACKLOG.md`** or **`todo.txt`** if present (user may point at one).
   - Post a short **inventory**: current phase, stack, graph stats (`kg-bootstrap.json` / `graph.json`), open backlog lines (if any), and one sentence on what the PRD says v1 is.
   - Ask **one** question: what is the **first goal** for this session (or pick from backlog if the user wants you to propose; or use **`/daf-backlog-work`** to take the next item).
   - Remind: session **goals live in chat only**; follow `.agent/phases/developing.md` for implementation work; run **`npm run kg:ingest`** after code changes, **`/daf-kg-ingest`** when canon docs change.

## Hard rules

- Do **not** implement product code in this skill unless the user explicitly asks in the same message.
- Do **not** write session goals into `.agent/` or the backlog file.
- One clarifying question at kickoff unless the user already stated the first goal.

## Stop condition

- `phase` is `developing` (or user declined phase change and only wanted kickoff in an already-developing repo).
- User has a clear **first session goal** or explicitly deferred choosing one.
