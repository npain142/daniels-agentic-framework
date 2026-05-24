# Skill: /issue

**When:** `phase === "developing"` **or** `phase === "maintaining"` and something is broken.

## Steps

1. Reproduce: exact steps, expected vs actual.
2. Write or locate a failing automated test when feasible. In **`maintaining`**, a **failing test before the fix** is **mandatory** unless the user **explicitly** waives in the session (document the waiver).
3. Isolate root cause; smallest fix first.
4. Add regression coverage if missing.
5. If the bug reveals a trap, append one bullet to `.agent/memory/gotchas.md`.
6. Verify per **`.agent/phases/{phase}.md`**: per-goal `config.taskCheck`, update `verify-state.json` when the session task ends. In **`developing`**, full `config.check` when codebase-check applies. In **`maintaining`**, full **`config.check` every session task** (not only on codebase-check cadence).

## Stop condition

Reproduction is gone on the exercised paths; current phase stop conditions met (or user explicitly accepts gaps).
