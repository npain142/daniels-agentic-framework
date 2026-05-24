# Skill: /grill-me

**When:** `phase === "planning"`.

For unstructured exploration first, use `/discuss`; switch here when ready to lock PRD sections. **Brownfield adoption** (existing repo + docs, or user wants code reviewed before DAF files): use **`/setup`** — it includes inventory + the same interview minimum **before** populating `.agent/`. Use **standalone `/grill-me`** only when `.agent/` already exists and you need a focused PRD pass (gaps after `/setup`, or iterating the PRD without re-running project setup).

## Steps

1. One question at a time. Track answers mentally or in a scratch buffer.
2. Cover at minimum: problem, user, non-goals, v1 cut (“if you ship one thing”), success signal.
3. Write or update `.agent/PRD.md` with sections: Goal, Non-goals, v1 scope, Success.
4. Recommend a **stack id** from built-ins under `~/.config/agent/stacks/` (after `daf global-setup`) based on tech constraints; explain in two sentences.
5. After the user agrees, set **`config.stack`** in `.agent/config.json` to that id. If `$HOME/.config/agent/stacks/<id>.md` is missing, tell them to run **`daf global-setup`** (add **`--platform cursor`** on Cursor for skill picker mirroring).

## Stop condition

PRD sections are concrete enough that another engineer could implement v1 without interviewing the author again.
