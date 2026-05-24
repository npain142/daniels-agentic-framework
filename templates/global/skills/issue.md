# Skill: /issue

**When:** `phase === "developing"` and something is broken.

## Steps

1. Reproduce: exact steps, expected vs actual.
2. Write or locate a failing automated test when feasible.
3. Isolate root cause; smallest fix first.
4. Add regression coverage if missing.
5. If the bug reveals a trap, append one bullet to `.agent/memory/gotchas.md`.
6. Follow **`/task`** for verification: per-goal `config.taskCheck`, update `verify-state.json` when the session task ends, full `config.check` when codebase-check applies.

## Stop condition

Reproduction is gone on the exercised paths; **`/task`** stop conditions met (or user explicitly accepts gaps).
