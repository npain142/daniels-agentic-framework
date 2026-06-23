# Skill: /daf-linear-work

**When:** `phase === "developing"` or `phase === "maintaining"`. Requires Linear integration configured (`config.json.integrations` includes `"linear"`).

If Linear is not yet configured, run `/daf-linear-setup` first.

## Steps

### Start

1. Read `.agent/config.json`. Confirm `integrations` includes `"linear"` and read `linearTeam` and `linearTestingState`.
   - If `linearTeam` is missing, ask once for the team name and note that `/daf-linear-setup` should be run to persist the config.

2. **Pick an issue:**
   - If the user specified an issue ID (e.g. `LIN-42`), call `get_issue` directly and skip the list.
   - Otherwise, call `list_issues` with `assignee: "me"`, filtered to the configured team, ordered by `updatedAt`.
     - Default: show open issues with state type `unstarted` ("Todo") or `started` ("In Progress").
     - If user said "continue", filter to `state: "In Progress"` only.
   - Present the list numbered. Ask once: **"Which issue do you want to work on?"**

3. Call `get_issue` to load the full issue: title, description, acceptance criteria (checklist if present), labels, priority.

4. **State session goals in chat only** (derived from issue title + description checklist; do not write to `.agent/` files).

5. Call `save_issue` with `id: <issueId>` and `state: "In Progress"` to move the issue. Skip if it is already "In Progress".

### Implement

6. Follow **`.agent/phases/{phase}.md`** implementation bar exactly:
   - Per goal: implement → run `config.taskCheck` → green before proceeding.
   - Session-level `taskCheck` once all goals are done.
   - Increment `taskCount` in `.agent/verify-state.json`; run codebase-check when due.
   - Read `.agent/memory/remember.md` and `gotchas.md` before non-trivial edits.

7. Self-review diff vs acceptance criteria from the issue description.

### Close (user accepts)

8. **Only after explicit user acceptance** that the work is tested/done:

   a. Discover the testing state: call `list_issue_statuses` with `team: <linearTeam>`. Match against `config.json.linearTestingState`; fall back to any state name containing "Test", "Review", or "QA" if no exact match.

   b. Call `save_issue` with `id: <issueId>` and `state: <testingState>` to move the issue.

   c. Get current commit hash via shell: `git rev-parse --short HEAD` and current branch: `git branch --show-current`.

   d. Call `save_comment` on the issue with:
      ```
      Implemented in commit <hash> on branch <branch>.

      <1–2 sentence summary of what changed and why>
      ```

9. **Commit** per **`~/.config/agent/IDENTITY.md`** (Task endings) before declaring done.
10. Run `/daf-retro` if the work was non-trivial.

## Hard rules

- Do **not** move the issue to the testing state until the user explicitly accepts the work.
- Session goals stay in **chat only** — never write them to `.agent/` files.
- If `taskCheck` is red, fix before proceeding — never declare done with failing tests.
- Never post the Linear comment before the commit exists.

## Stop condition

Issue moved to `linearTestingState`, commit hash posted as a Linear comment, session committed per phase bar.
