# Learnings

Short bullets promoted from `/retro` after non-trivial work.

- Backlog: `BACKLOG.md` + `/backlog-add` / `/backlog-work`; done items archive to `LOGBACK.md` (7d/14d prune, `#keep` exempt). After template/skill changes, `/onboard` on each machine with `--platforms`.
- Shared `.agent/` stays machine-agnostic; IDE list is `~/.config/agent/platforms.json` from `/onboard`; `/setup` merges overlays for every listed platform.
- v1 install is skills-only: `/onboard` + `templates/global/onboarding/global-setup.md`; mechanical copy via `npm run global-install` from DAF repo (no `daf` CLI).
- `/help`: agent-facing cap ~35 lines; code depth stays on `/how-it-works`.
