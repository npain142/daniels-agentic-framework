# Phase: planning

## Purpose

Decide what to build and how the agent should behave before production code. **`config.stack`** stays `null` after **greenfield** `/daf-setup` until product clarity (**`/daf-grill-me`** or equivalent). On **brownfield** `/daf-setup`, the interview runs inside that skill; set **`config.stack`** after the user agrees.

## Definition of done (exit to developing or maintaining)

- `PRD.md` exists with goal, non-goals, v1 scope, and a clear success signal.
- `GLOSSARY.md` exists (short is fine; expand later).
- `ARCHITECTURE.md` exists (module sketch and boundaries for this repo or product).
- `config.stack` is set to a non-null value and `~/.config/agent/stacks/{stack}.md` exists (run `/daf-onboard` if needed).
- `phases/planning.md`, `phases/developing.md`, and `phases/maintaining.md` are present.
- **Knowledge graph:** domain/concept graph bootstrapped at transition (`kg-bootstrap.json` receipt, `graphify.config.json`); see **`/daf-phase-transition`**.

Follow **`/daf-phase-transition`** — it enforces the planning-exit checklist and KG bootstrap.

## Allowed

- Specs, sketches, ADRs if you want them (not required in lean v1).
- Throwaway spikes on branches or local experiments (no merge to main as “done” product).
- **Brownfield migration:** routine bugfixes and maintenance while `phase === "planning"` during adoption are OK. Do **not** start **net-new product scope** until planning exit is complete.

## Forbidden

- Shipping production **features** (net-new capability) while `phase` is still `planning`.
- Pretending the stack is fixed before it is written to `config.json`.

## Active skills

- `/daf-discuss` — explore ideas before committing to PRD or implementation.
- `/daf-backlog-add` — park follow-ups in repo-root `BACKLOG.md`.
- `/daf-pivot` — restructure or redesign a feature or concept; update PRD/glossary/architecture before code.
- `/daf-onboard` — **machine setup:** install globals when missing (before first `/daf-setup` on a machine).
- `/daf-setup` — **project setup:** greenfield scaffold; brownfield inventory + interview then merge scaffold and populate docs; verify-state; optional Cursor overlay.
- `/daf-grill-me` — **product grill** in planning (one question at a time, assumption audit) → `PRD.md`; stack recommendation; agent sets `config.stack` after user agrees (unless set at end of brownfield `/daf-setup`).
- `/daf-start` — when exit criteria pass: validate checklist, set `developing`, kick off first build session (reads backlog if present).
- `/daf-remember` — save standing instructions for the project.
- `/daf-retro` — capture learnings.
- `/daf-phase-transition` — validate exit checklist; update `config.phase` when criteria pass.

## Merge / release

Not applicable until developing or maintaining.
