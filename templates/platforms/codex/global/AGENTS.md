# Daniel Agent Framework (DAF) — global Codex guidance

Read **[~/.config/agent/IDENTITY.md](~/.config/agent/IDENTITY.md)** for how the agent works with you.

In any DAF-enabled repo:

1. Read **`.agent/AGENTS.md`** and **`.agent/config.json`** at session start.
2. Installed IDE platforms are in **`~/.config/agent/platforms.json`** (from **`/onboard`**).
3. Run **`/setup`** in a project to copy `.agent/` and merge IDE overlays for all platforms listed there.
4. Procedures: flat skills under `~/.config/agent/skills/daf-*.md`; Cursor/Claude also install native skill folders when selected at onboard.

Repo-root **`AGENTS.md`** in each project should point at `.agent/AGENTS.md` (created by **`/setup`**).
