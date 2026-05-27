# Codebase snapshot

Updated: 2026-05-27

## Ubiquitous language

DAF, global/project context, phases, stack, platform (IDE layer), **local.json** (machine-local `platforms[]`), IDE skills, scaffold, taskCheck/check, backlog/logback.

## Stack constraints

TypeScript monorepo: `packages/cli` install library, `scripts/global-install.mjs`, Vitest with temp dirs + `DAFE_GLOBAL_ROOT` / `DAF_CURSOR_SKILLS_ROOT`.

## Standing rules

Install tooling: no LLM; no summarizing doc-only edits unless asked.

## Traps

- `platform` must not live in committed `config.json` — use gitignored `.agent/local.json`.

## Learnings

Skills-only `/daf-onboard`; backlog via BACKLOG.md / LOGBACK.md.

## Architecture anchors

Templates → `/daf-onboard` → `~/.config/agent/` + optional Cursor skills; `/daf-setup` → `.agent/` + `local.json` + per-platform project overlays.

## Drift / cleanup candidates

Re-run `/daf-onboard` on machines after template/skill changes; migrate legacy repos: remove `platform` from `config.json`, add `local.json`.
