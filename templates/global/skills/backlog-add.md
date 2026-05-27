# Skill: /daf-backlog-add

**When:** Any phase. Capture a follow-up, idea, or task for later without starting implementation.

**Not:** Building work (`/daf-backlog-work`), bugs to fix now (`/daf-issue`), or standing rules (`/daf-remember`).

## Steps

1. Restate the item in one line; confirm wording if ambiguous.
2. Resolve repo-root **`BACKLOG.md`** (create from **`~/.config/agent/root-BACKLOG.md`** if missing).
3. Ensure sections exist: **`## Open`**, **`## In progress`** (may be empty), per the template.
4. Append under **`## Open`** as `- [ ] <text>` (optional trailing tags: `#feature`, `#bug`, `#polish`, `#keep-topic` for richer logback later).
5. Light dedupe: if a substantially similar open line exists, ask once whether to add anyway.
6. **Do not** implement product changes in this skill unless the user explicitly asks in the same message.

## Hard rules

- Do **not** write session goals into `BACKLOG.md` (session goals stay in chat per `phases/developing.md`).
- Do **not** edit **`LOGBACK.md`** in this skill.

## Stop condition

The new line appears under **`## Open`** in `BACKLOG.md`.
