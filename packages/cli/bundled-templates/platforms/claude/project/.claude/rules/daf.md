# Daniels Agentic Framework (DAF)

0. **DAF update (once per session):** Run `node ~/.config/agent/daf-version-check.mjs` (honor `DAFE_GLOBAL_ROOT`; fallback: `cmp -s .agent/daf-pin ~/.config/agent/daf-pin 2>/dev/null || echo project-stale`). Use **only** the one stdout token — do not read `daf-pin` files into context. If not `ok` and you have not prompted yet this session, ask: **"DAF templates are stale (`<status>`). Apply the update to this repo?"** — **yes** → **`/daf-update`** before other work; **no** → continue; do not ask again this session.
1. Read [.agent/config.json](.agent/config.json) for `phase`, `stack`, `check`, `taskCheck`, `codebaseEvery`, optional `defaultBranch`, and when in **developing** or **maintaining**, `.agent/verify-state.json` for session task totals.
2. Load [.agent/phases/](.agent/phases/) for the matching `phase` file.
3. Installed platforms are listed in `~/.config/agent/platforms.json` (from **`/daf-onboard`**). **Project setup:** run **`/daf-setup`** — merges `.agent/` and IDE overlays for every platform in that file.
4. DAF skills: invoke only **`/daf-<slug>`** in chat; files at `~/.claude/skills/daf-*/SKILL.md` (when `claude` is listed) or `~/.config/agent/skills/daf-*.md`. Do not use unprefixed `/setup`, `/onboard`, etc. Project rules: **`daf.mdc`** / **`daf.md`** only for DAF bootstrap.
5. Full load order: [.agent/AGENTS.md](.agent/AGENTS.md).
