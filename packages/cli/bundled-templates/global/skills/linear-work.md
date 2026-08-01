# Skill: /daf-linear-work

**When:** `phase === "developing"` or `phase === "maintaining"`. Requires Linear integration configured (`config.json.integrations` includes `"linear"`).

If Linear is not yet configured, run `/daf-linear-setup` first.

## Steps

### Start

1. Read `.agent/config.json`. Confirm `integrations` includes `"linear"` and read `linearTeam` and `linearTestingState`.
   - If `linearTeam` is missing, ask once for the team name and note that `/daf-linear-setup` should be run to persist the config.

2. **Determine scope:**
   - **Specific issue** — if the user supplied an issue ID (e.g. `LIN-42`) or a direct URL, call `get_issue` and go to the **Single-issue flow**.
   - **No issue specified** — call `list_issues` with `assignee: "me"`, filtered to the configured team, state type `unstarted` or `started`, ordered by `updatedAt`. If the result is empty, report "No open assigned issues found." and stop.
     - **One result** → go to the **Single-issue flow** with that issue.
     - **Multiple results** → go to **Multi-issue flow**.

---

## Single-issue flow

3. Call `get_issue` to load the full issue: title, description, acceptance criteria (checklist if present), labels, priority.
4. **State session goals in chat only** (derived from issue title + description checklist; do not write to `.agent/` files).
5. Call `save_issue` with `id: <issueId>` and `state: "In Progress"`. Skip if already "In Progress".

### Implement

6. Follow **`.agent/phases/{phase}.md`** implementation bar exactly:
   - Per goal: implement → run `config.taskCheck` → green before proceeding.
   - Session-level `taskCheck` once all goals are done.
   - Increment `taskCount` in `.agent/verify-state.json`; run codebase-check when due.
   - Read `.agent/memory/remember.md` and `gotchas.md` before non-trivial edits.
7. Self-review diff vs acceptance criteria from the issue description.

### Close (user accepts)

8. **Only after explicit user acceptance:**

   a. Discover the testing state: call `list_issue_statuses` with `team: <linearTeam>`. Match against `config.json.linearTestingState`; fall back to any state name containing "Test", "Review", or "QA" if no exact match.

   b. Call `save_issue` with `id: <issueId>` and `state: <testingState>`.

   c. Get current commit hash (`git rev-parse --short HEAD`) and branch (`git branch --show-current`).

   d. Call `save_comment` on the issue:
      ```
      Implemented in commit <hash> on branch <branch>.

      <1–2 sentence summary of what changed and why>
      ```

9. **Commit** per **`~/.config/agent/IDENTITY.md`** before declaring done.
10. Run `/daf-retro` if non-trivial.

---

## Multi-issue flow

When multiple issues are found and no specific issue was requested, spawn one **subagent** per issue in parallel — each subagent runs the **Single-issue flow** independently.

### Spawn subagents

3. For each issue in the list, spawn a subagent with a task description structured as:

   ```
   DAF Linear work — <issue identifier>: <issue title>

   Run /daf-linear-work for issue <identifier>.

   Context:
   - Issue ID: <id>
   - Title: <title>
   - Description: <description excerpt>
   - Repo: <absolute path to workspace root>
   - config.json: phase=<phase>, linearTeam=<team>, linearTestingState=<state>

   Follow the Single-issue flow from the /daf-linear-work skill exactly:
   1. Call get_issue to load full details.
   2. Set issue to In Progress.
   3. Implement (taskCheck per goal, session taskCheck when done).
   4. Wait for user acceptance before moving to testing state.
   5. Post commit comment; commit.
   ```

   Spawn all subagents in a **single message** (parallel launch) for independent issues.

   > **Conflict note:** if any two issues are likely to touch the same files, note this to the user before spawning and suggest working them sequentially to avoid merge conflicts.

### Monitor

4. After spawning, summarize the launched subagents: issue ID, title, and status. The user interacts with each subagent individually to provide acceptance and drive it to the Close step.

5. When all subagents complete, the parent agent reports a final summary: which issues moved to `linearTestingState` and which (if any) are still in progress.

---

## Hard rules

- Do **not** move an issue to the testing state until the user explicitly accepts that work.
- Session goals stay in **chat only** — never write them to `.agent/` files.
- If `taskCheck` is red, fix before proceeding — never declare done with failing tests.
- Never post the Linear comment before the commit exists.
- In the multi-issue flow, each subagent increments `verify-state.json` independently — after all subagents finish, reconcile `taskCount` to the correct total (count completed subagents that each count as one task).

## Stop condition

All targeted issues moved to `linearTestingState`, commit hashes posted as Linear comments, session(s) committed per phase bar.
