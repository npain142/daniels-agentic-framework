# Skill: /daf-linear-setup

**When:** Any phase; Linear MCP plugin must be installed in the IDE.

Sets up or reviews the Linear integration for this project and outputs workflow best practices.

## Steps

### Check current state

1. Read `.agent/config.json`. If `integrations` already includes `"linear"`, report the current config (`linearTeam`, `linearTestingState`) and skip to **Best practices**.

### Configure

2. Call `list_teams` (Linear MCP) to list available teams. Present them to the user.
3. Ask once: **"Which team should this project track?"** Record the chosen name or ID as `team`.
4. Call `list_issue_statuses` with `team` to show available workflow states.
5. Ask once: **"Which state should represent 'In Testing' / ready for QA?"** Suggest any state whose name contains "Test", "Review", or "QA"; default to the first `started`-type state if none match. Record as `testingState`.

### Write config

6. Edit `.agent/config.json` — add or update (merge with any existing values, do not overwrite unrelated fields):
   - `"integrations": ["linear"]` (append `"linear"` to any existing integrations array)
   - `"linearTeam": "<chosen team name or ID>"`
   - `"linearTestingState": "<chosen state name>"`
7. **Retire markdown backlog:** Delete repo-root **`BACKLOG.md`** and **`LOGBACK.md`** if present (Linear replaces them). Tell the user which files were removed; do not commit unless asked.
8. Do **not** commit — user decides when to commit the config change.

### Best practices

Output the following as a formatted list:

**Linear + DAF best practices:**

- **Park ideas in Linear.** Use `/daf-backlog-add` to create backlog issues (replaces repo-root `BACKLOG.md`).
- **Work issues in Linear.** Use `/daf-linear-work` to pick and implement assigned issues (replaces `/daf-backlog-work` and `LOGBACK.md` archival).
- **One issue per session goal.** Use `/daf-linear-work` to pick one "In Progress" or "Todo" issue at a time; resist loading multiple issues in one session.
- **Write titles imperatively.** Issue titles become session goals in chat — prefer "Add auth middleware" over "Auth middleware broken".
- **Put acceptance criteria in the description.** Use a checklist in the Linear issue description; `/daf-linear-work` reads it directly as acceptance checks.
- **Name branches after the issue identifier.** Example: `feat/LIN-42-add-auth`. The skill posts the branch/commit as a Linear comment.
- **Use sub-issues for work too large for one session.** Break large issues into sub-issues; the parent moves to "In Testing" only when all sub-issues are accepted.
- **Avoid re-opening "In Testing" issues.** If a test fails post-review, create a new bug issue linked as "blocked by" rather than reverting the state — keeps history clean.
- **Sync LTM periodically.** Use `/daf-ltm-checkup` to reconcile `.agent/` docs with your Linear project description and milestones.

## Stop condition

`config.json` has `integrations` containing `"linear"`, `linearTeam`, and `linearTestingState` set, markdown backlog files removed if they existed, and best practices have been shown to the user.
