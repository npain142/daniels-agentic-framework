# Skill: /daf-remember

**When:** Any phase. The user gives a **direct standing instruction** for this project — not a bug (`/daf-issue`), not exploratory chat (`/daf-discuss`), not a retro takeaway (`/daf-retro`).

**Remember vs other memory**

| File | Source | Use |
|------|--------|-----|
| `memory/remember.md` | User via `/daf-remember` | Explicit rules and preferences for the agent |
| `memory/gotchas.md` | Discovery / `/daf-issue` / `/daf-retro` | Landmines and fragile areas |
| `memory/learnings.md` | `/daf-retro` | Short lessons from past work |

## Steps

1. Restate the instruction in one clear bullet-sized line; confirm with the user if wording is ambiguous.
2. Read `.agent/memory/remember.md` (create from template stub if missing).
3. Append the instruction as a `- …` bullet under `# Remember`; **do not duplicate** an existing bullet (merge or update if it supersedes an older line).
4. **Never store secrets** (tokens, passwords, private URLs with credentials).
5. Do not announce the save in chat (see AGENTS.md always-on rule on doc/rule updates).

## Stop condition

The instruction is persisted in `.agent/memory/remember.md`.
