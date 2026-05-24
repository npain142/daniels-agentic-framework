# Glossary — DAF monorepo

| Term | Definition |
|------|------------|
| **DAF** | Daniel Agent Framework — markdown-first agent rules plus the minimal `daf` CLI. |
| **daf** | The CLI binary from `@daniels-agent-framework/cli`; v1 exposes **`daf global-setup`** only (filesystem copy). |
| **Phase** | `planning`, `developing`, or `maintaining`; stored in `.agent/config.json` and mirrored in `.agent/phases/*.md`. |
| **Stack** | String id matching `~/.config/agent/stacks/<id>.md` (installed from `templates/stacks`); `null` until chosen. |
| **Skill** | Markdown procedure in `~/.config/agent/skills/daf-*.md` (from `skill-manifest.json`) invoked as `/name` in the IDE; on Cursor with `daf global-setup --platform cursor`, mirrored under `~/.cursor/skills/daf-*/SKILL.md` for the skill picker. |
| **Improvement** | Work that makes **existing** behavior, code, or docs better (`/improvement`); distinct from **net-new capability** (`/new-feature`). |
| **Pivot** | Restructure or redesign of an **existing** feature, concept, or architecture (`/pivot`); updates canonical docs and migration before code; distinct from incremental **improvement** and **net-new** work. |
| **Discuss** | Exploratory dialogue on a topic or idea (`/discuss`); no implementation unless the user asks. |
| **Remember** | User-stated standing instruction persisted in `.agent/memory/remember.md` via `/remember`. |
| **Platform** | `generic` (default) or `cursor` on **`daf global-setup --platform cursor`**; future: other dirs under `templates/platforms/`. |
| **Global context** | Files under `~/.config/agent/` (identity, preferences, skills, stacks, **scaffold**). |
| **Global setup** | **`daf global-setup`** — installs `~/.config/agent/` (skills, stacks, scaffold, optional Cursor mirror); machine-wide, not per repo. |
| **Project setup** | Skill **`/setup`** — adapts DAF to the current repo after global setup: greenfield scaffold only; brownfield interview then populated `.agent/` and docs. |
| **Scaffold** | Default `.agent/` tree installed at `~/.config/agent/scaffold/`; agents copy or merge from here via **`/setup`**. |
| **Setup** | Skill **`/setup`** — see **Project setup**; prerequisite is **Global setup** on the machine. |
| **Platform dir** | `templates/platforms/<id>/` in the DAF repo; shipped beside the CLI; Cursor holds manifest + rules overlay. |
| **Project context** | Files under `<repo>/.agent/` (config, phases, PRD, glossary, architecture, memory). |
| **Template root** | Repository `templates/` directory shipped beside `packages/cli` for copy operations. |
| **Task** | Current bounded work with the user in a session; goals live in dialogue only. |
| **Goal** | One outcome within a session task; verified with `taskCheck` when behavior changes. |
| **taskCheck** | Fast verification command in `config.json` (e.g. `npm run test`). |
| **taskCount** | Monotonic count of completed session tasks in `verify-state.json`; incremented by the agent per `/task`. |
| **codebaseEvery** | Positive integer in `config.json`; when `taskCount % codebaseEvery === 0` (and `taskCount > 0`), run codebase-check. |
| **initialTaskCount** | Non-negative integer in `config.json`; seeds `verify-state.json` → `taskCount` when `/setup` creates verify-state. |
| **Codebase check** | Two-phase verify: (A) refresh `memory/codebase-snapshot.md`, (B) run `config.check` + cleanup. |
| **Codebase snapshot** | Bounded summary in `memory/codebase-snapshot.md` derived from glossary, stack, memory, architecture. |

## Banned synonyms

Use **phase** (not “mode” or “stage” for this switch). Use **stack** (not “profile” or “flavor”) for the `stacks/*.md` id.
