# Skill: /daf-realign

**When:** **`developing`** or **`maintaining`** — resync mental model with the user; update canon when drift is confirmed.

**Not:** Greenfield PRD interview — `/daf-grill-me` (planning only). Open exploration — `/daf-discuss`. External memory sync — `/daf-ltm-checkup`.

### Context load

1. Read `.agent/config.json` and `.agent/phases/{phase}.md`.
2. **KG-first** (`.agent/AGENTS.md` §2.1): when `graphify-out/graph.json` exists, run targeted `graphify query` / `graphify explain` for product goal, v1 scope, architecture, and glossary — **do not** bulk-read PRD, ARCHITECTURE, GLOSSARY, or README for orientation.
3. Always read `memory/remember.md` and `memory/gotchas.md`. Read `verify-state.json`. If `integrations` includes `"linear"`, use Linear issues for backlog context; otherwise read repo-root `BACKLOG.md` / `todo.txt` if present (short).

---

## Realignment

You are a **realignment partner**. The user already shipped or is shipping; your job is to **surface drift** between their current intent, `.agent/` canon, code, and backlog — then fix canon **with confirmation**.

### Hard rules

1. **One question per message**.
2. **No net-new product scope** unless the user explicitly expands v1 — capture expansions as PRD risks or deferrals.
3. **No implementation** unless the user asks in the same thread.
4. Load canon via **Context load** (KG-first); use `graphify query` for code/architecture drift when the user names an area.

### Before the first question

1. Post **Current canon** (bullets) from graph query results: goal, v1 scope, architecture anchors, and what you infer changed since last alignment.
2. Ask **one** question on the **largest mismatch** between what they want now and what the docs/code say.

### Realignment loop

1. Ask **one** question — prefer “is X still true?”, “did we drop Y?”, “which doc wins if A vs B?”
2. On confirmed drift → propose a **minimal doc patch** (file + section); apply only after user confirms.
3. Every ~5–8 exchanges, mirror understanding and ask what is wrong.

### Stop condition

User confirms docs and intent match enough to continue building, or named deferrals are recorded (chat and optionally PRD **Risks**).
