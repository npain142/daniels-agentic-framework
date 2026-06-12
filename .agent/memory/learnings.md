# Learnings

Short bullets promoted from `/daf-retro` after non-trivial work.

- Backlog: `BACKLOG.md` + `/daf-backlog-add` / `/daf-backlog-work`; done items archive to `LOGBACK.md` (7d/14d prune, `#keep` exempt). After template/skill changes, `/daf-onboard` on each machine with `--platforms`.
- Shared `.agent/` stays machine-agnostic; IDE list is `~/.config/agent/platforms.json` from `/daf-onboard`; `/daf-setup` merges overlays for every listed platform.
- v1 install is skills-only: `/daf-onboard` + `templates/global/onboarding/global-setup.md`; mechanical copy via `npm run global-install` from DAF repo (no `daf` CLI).
- `/daf-help`: agent-facing cap ~35 lines; code depth stays on `/daf-how-it-works`.
- Product name: **Daniels Agentic Framework** (DAF); `branding.test.ts` guards templates and docs.
- `README.md` is the primary human onboarding path: problem → guided `/daf-onboard` → `/daf-setup` → phase/skills table; contributor section stays at the bottom.
- DAF chat skills and docs use **`/daf-<slug>`** only (e.g. `/daf-pivot`); unprefixed `/setup` is deprecated. Bulk replace must not touch `/onboarding` paths (`/onboard` is a prefix).
- Root `AGENTS.md` is a thin pointer only; skill catalog lives in `skill-manifest.json`; KG policy in `.agent/AGENTS.md` §2.1 + `graphify.mdc`; graphify `cache/` and `graph.html` are gitignored.
