# Skill: /daf-backlog-work

**When:** **`developing`** or **`maintaining`**. Pick one open backlog item, implement it, then close it into fading memory.

**Not:** Capturing ideas only (`/daf-backlog-add`), phase kickoff without implementation (`/daf-start`), or planning-only exploration (`/daf-discuss`).

## Steps

### Pick and plan

1. Read repo-root **`BACKLOG.md`**. List items under **`## Open`** (numbered). If **`## In progress`** has a line, treat it as the active item or ask once whether to continue it.
2. User picks by number, exact text, or names a new goal (then skip backlog mutation until close).
3. **Classify** once: `/daf-new-feature` | `/daf-improvement` | `/daf-issue` | `/daf-pivot`. If wrong class, stop and hand off.
4. Optionally move the chosen line to **`## In progress`** (at most one line); remove checkbox prefix for the working copy if needed.
5. Restate **acceptance checks** in chat as session goals (per **`.agent/phases/{phase}.md`** — goals in chat only).

### Implement

6. Follow the classified skill’s implementation bar (architecture, tests, `config.taskCheck`, `verify-state.json`, codebase-check when due).
7. Self-review vs acceptance; `/daf-retro` if non-trivial.

### Close (user accepts)

8. **Only after explicit user acceptance** that the work is tested/done:
   - **Remove** the item completely from `BACKLOG.md` (from **Open** or **In progress**).
   - **Append** a short artifact to repo-root **`LOGBACK.md`** (create from **`~/.config/agent/root-LOGBACK.md`** if missing) — see **Logback entry** below.
   - Run **prune** on `LOGBACK.md` (see **Fading** below).
9. **Commit** committable changes per **`IDENTITY.md`** (Task endings) and phase **Task summary** before declaring done.

## Logback entry

Under **`## Entries`**, append newest first:

```markdown
### YYYY-MM-DD — <short topic>
- **Source:** <original backlog line>
- **Outcome:** <1–3 sentences: what changed, where, decisions>
- **Tags:** <optional #feature #area — omit line if none>
```

Derive **topic** from the backlog line (strip checkbox/tags). If the line had no meaningful topic, write a concise topic from the outcome anyway.

## Fading (prune on every close)

Remove **`### YYYY-MM-DD`** entry blocks from `LOGBACK.md` when:

| Entry | Remove if older than |
|-------|----------------------|
| Has **`#keep`** in **Tags** or **Outcome** | Never auto-prune (user-tagged) |
| Has any other tag in **Tags** | **14** calendar days |
| No tags (topic-only / minimal) | **7** calendar days |

Parse dates from `### YYYY-MM-DD` headers. Delete whole blocks including bullet lines until the next `###` or EOF.

## Hard rules

- Do **not** remove from `BACKLOG.md` or write `LOGBACK.md` until the user accepts the work.
- Session goals stay in **chat** only; `LOGBACK.md` is archival context, not a task list.
- Read **`LOGBACK.md`** before non-trivial implementation when the topic may relate to past backlog work.

## Stop condition

Acceptance satisfied per the current phase bar **and** backlog line removed **and** logback entry written (or user defers logback with explicit instruction).
