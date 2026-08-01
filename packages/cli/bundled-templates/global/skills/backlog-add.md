# Skill: /daf-backlog-add

**When:** Any phase. Capture a follow-up, idea, or task for later without starting implementation.

**Not:** Building work (`/daf-backlog-work` or `/daf-linear-work`), bugs to fix now (`/daf-issue`), or standing rules (`/daf-remember`).

## Steps

1. Restate the item in one line; confirm wording if ambiguous.
2. Read `.agent/config.json`. **Branch on integration** (Linear vs markdown — do not mix paths).

### Linear mode (`integrations` includes `"linear"`)

Requires Linear MCP plugin and **`/daf-linear-setup`** completed (`linearTeam` set).

3. If `linearTeam` is missing, stop — run **`/daf-linear-setup`** first.
4. Light dedupe: call `list_issues` with the configured team and a title keyword from the item; if a substantially similar open issue exists, ask once whether to add anyway.
5. Resolve backlog state: call `list_issue_statuses` with `team: <linearTeam>`. Prefer a state named **Backlog**; else the first **unstarted** state (often **Todo**).
6. Call `save_issue` (create — **no** `id`): `title: <one-line item>`, `team: <linearTeam>`, `state: <backlog state>`. Optional: `description` if the user gave acceptance hints; map trailing tags (`#feature`, `#bug`, `#polish`) to `labels` when matching team labels exist.
7. Report the created issue identifier and URL.

**Stop condition (Linear):** A new issue exists in the team's backlog/Todo state.

### Markdown mode (default)

3. Resolve repo-root **`BACKLOG.md`** (create from **`~/.config/agent/root-BACKLOG.md`** if missing).
4. Ensure sections exist: **`## Open`**, **`## In progress`** (may be empty), per the template.
5. Append under **`## Open`** as `- [ ] <text>` with optional tags: `#p1`/`#p2`/`#p3` (priority, default `#p2`), `#feature`, `#bug`, `#polish`, `#pivot`, `#keep` (for logback pruning).
6. Light dedupe: if a substantially similar open line exists, ask once whether to add anyway.

**Stop condition (markdown):** The new line appears under **`## Open`** in `BACKLOG.md`.

7. **Do not** implement product changes in this skill unless the user explicitly asks in the same message.

## Hard rules

- **Linear mode:** do **not** create or edit **`BACKLOG.md`** or **`LOGBACK.md`**.
- **Markdown mode:** do **not** write session goals into `BACKLOG.md` (session goals stay in chat per `phases/developing.md`); do **not** edit **`LOGBACK.md`** in this skill.
