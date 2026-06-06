# Codebase snapshot

Updated: 2026-06-02

## Ubiquitous language

DAF, global/project context, phases, stack, platform (IDE layer), **`platforms.json`** (`~/.config/agent/`, from `/daf-onboard`), IDE skills, scaffold, taskCheck/check, backlog/logback.

## Stack constraints

TypeScript monorepo: `packages/cli` install library, `scripts/global-install.mjs`, Vitest with temp dirs + `DAFE_GLOBAL_ROOT` / `DAF_CURSOR_SKILLS_ROOT`.

## Standing rules

Install tooling: no LLM; no summarizing doc-only edits unless asked.

## Traps

- Do not put `platform` / `platforms` in committed `.agent/config.json` — IDE list is `~/.config/agent/platforms.json` from `/daf-onboard`.
- No `.agent/local.json` — removed; legacy repos: drop `platform` from `config.json` and run `/daf-onboard` if `platforms.json` is missing.

## Learnings

Skills-only `/daf-onboard`; backlog via BACKLOG.md / LOGBACK.md.

## Architecture anchors

Templates → `/daf-onboard` → `~/.config/agent/` (incl. `platforms.json`) + optional Cursor skills; `/daf-setup` → `.agent/` + per-platform project overlays from `platforms.json`.

## Drift / cleanup candidates

Re-run `/daf-onboard` on machines after template/skill changes; re-ingest KG after canon/memory alignment passes.
