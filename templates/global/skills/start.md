# Skill: /start

**When:** User is ready to **begin developing** after planning — first build session or returning to `developing` from `planning`.

**Not:** Net-new product interviews (`/grill-me` in planning), generic phase changes without kickoff (`/phase-transition` alone), or implementation of backlog items (use `/new-feature`, `/improvement`, etc.).

## Your job

1. Read `.agent/config.json` and planning exit criteria (same checklist as **`/phase-transition`** — keep aligned with `validatePlanningExit` in the DAF repo).
2. If `phase === "planning"`:
   - Run the checklist; if any check fails, list gaps and **stop** (do not change phase).
   - If all pass, set `phase` to `"developing"` in `.agent/config.json`.
3. If `phase` is already `developing` or `maintaining`, confirm with the user they want a **developing kickoff** (not a phase change); skip checklist unless they asked to re-validate planning exit.
4. **Kickoff (developing session):**
   - Read `.agent/verify-state.json`, `PRD.md`, `ARCHITECTURE.md`, and repo-root **`BACKLOG.md`** or **`todo.txt`** if present (user may point at one).
   - Post a short **inventory**: current phase, stack, open backlog lines (if any), and one sentence on what the PRD says v1 is.
   - Ask **one** question: what is the **first goal** for this session (or pick from backlog if the user wants you to propose; or use **`/backlog-work`** to take the next item).
   - Remind: session **goals live in chat only**; follow `.agent/phases/developing.md` for implementation work.

## Hard rules

- Do **not** implement product code in this skill unless the user explicitly asks in the same message.
- Do **not** write session goals into `.agent/` or the backlog file.
- One clarifying question at kickoff unless the user already stated the first goal.

## Stop condition

- `phase` is `developing` (or user declined phase change and only wanted kickoff in an already-developing repo).
- User has a clear **first session goal** or explicitly deferred choosing one.
