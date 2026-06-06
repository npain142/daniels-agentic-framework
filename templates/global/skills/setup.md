# Skill: /daf-setup

**When:** **Project setup** — adapt DAF to the **current repo** (greenfield scaffold, brownfield adoption, or IDE overlay refresh). This is an **IDE agent skill**, not a shell command.

**Machine prerequisite:** **`/daf-onboard`** installs globals under `~/.config/agent/` — skills, stacks, **scaffold**, **`platforms.json`**, and staged overlays under `$G/platforms/<id>/project/`. `/daf-setup` never replaces that step.

**Source of truth** for files to copy or merge is **`~/.config/agent/scaffold/`** and **`~/.config/agent/platforms.json`**. Do not copy from the DAF monorepo path on disk unless you are developing DAF itself.

**Always** work from **`$G`** = `~/.config/agent` (honor env **`DAFE_GLOBAL_ROOT`** if set).

## Step 0 — Detect

| Mode | Signals |
|------|---------|
| **Greenfield** | No `.agent/` (or empty) **and** no meaningful project docs (e.g. no product `README`, no `PRD.md`, no `docs/` with adoption context). |
| **Brownfield adoption** | No `.agent/` but **has** other project docs; **or** partial `.agent/` needing merge; **or** user explicitly adopting DAF on existing work. |
| **Greenfield + existing code** | Greenfield by docs, but non-trivial code exists (e.g. `src/`, app entrypoints, substantial tree): **ask** whether to review existing code; if yes → follow **Brownfield adoption** (inventory → interview → populate) before treating docs as empty. |
| **Overlay refresh** | `.agent/` + `config.json` already complete → re-apply IDE overlays from `platforms.json` if requested, or stop — DAF is present. |

If `.agent/` already exists and is non-empty and the user did **not** ask for brownfield merge or adoption, **stop** unless the case above applies.

## Step 1 — Globals

If `~/.config/agent/scaffold/config.json` is missing (or **`~/.config/agent/skills/daf-setup.md`** is missing), run **`/daf-onboard`** once on the machine (or follow `templates/global/onboarding/global-setup.md` from the DAF repo).

Read **`$G/platforms.json`**. If missing, run **`/daf-onboard`** first.

## Step 2a — Greenfield (scaffold only)

1. Recursively copy `$G/scaffold/` → `<repo>/.agent/`.
2. Write **`verify-state.json`** (see below).
3. If `<repo>/AGENTS.md` is missing and **`$G/root-AGENTS.md`** exists, copy that file to `<repo>/AGENTS.md`. If `$G/root-AGENTS.md` is missing, write a one-line pointer: “Read `.agent/AGENTS.md` then `.agent/config.json`.”
4. If **`$G/root-BACKLOG.md`** exists and the repo root has neither **`BACKLOG.md`** nor **`todo.txt`**, copy to `<repo>/BACKLOG.md`.
5. If **`$G/root-LOGBACK.md`** exists and the repo root has no **`LOGBACK.md`**, copy to `<repo>/LOGBACK.md`.
6. **Do not** set `config.stack` during setup (remains `null` from scaffold until product clarity).
7. **Platform overlays** (see below) — merge every IDE platform listed in **`$G/platforms.json`**.

**Handoff:** Structure is ready. **`/daf-grill-me`** is an **optional** next step when the user wants to lock the PRD — not part of this skill’s stop condition. When planning exit criteria pass, use **`/daf-start`** or **`/daf-phase-transition`** to enter developing.

## Step 2b — Brownfield adoption (interview before populated structure)

Order matters: **inventory → shared mental model → files**.

1. **Inventory** (before creating or overwriting user-authored content): read the codebase and existing docs; summarize what you believe (purpose, stack hints, boundaries, gaps).
2. **Interview** — follow the full **`/daf-grill-me`** protocol (skeptical one-question-at-a-time grill; assumption audit before writing PRD content; no inventing details); then recommend **`config.stack`** and confirm (ensure `$G/stacks/<id>.md` exists).
3. **Structure + populate:** merge from `$G/scaffold/`: for each path under scaffold, if the corresponding path under `.agent/` is **missing**, copy it in. **Never overwrite** an existing `.agent/config.json`. If you **create** `config.json` because it was missing, set `phase: "planning"` and `stack: null` until the user agrees on stack, then set **`config.stack`**; apply **package.json inference** (below) for new `config.json` only. Update **`.agent/PRD.md`**, **`.agent/GLOSSARY.md`**, **`.agent/ARCHITECTURE.md`** from the session — replace empty `_TODO_` / stubs where you have answers, do not wipe user edits without explicit consent.
4. **Force refresh:** only if the user explicitly asks; you may overwrite scaffold-shaped files **except** `config.json` and user-authored PRD/memory — confirm when unsure.
5. Write **`verify-state.json`** if missing (see below).
6. **Platform overlays** (see below).

**Handoff:** When planning exit criteria are met, **`/daf-start`** or **`/daf-phase-transition`**. Do **not** require a separate **`/daf-grill-me`** after brownfield `/daf-setup` unless gaps remain in the PRD.

## verify-state.json

Let `every = max(1, codebaseEvery from config)` and `seed = max(0, initialTaskCount from config)`.

```json
{
  "taskCount": <seed>,
  "codebaseCheckPending": <seed > 0 && seed % every === 0>,
  "lastCodebaseSnapshotAt": null
}
```

(Same semantics as `buildInitialVerifyState` in `packages/cli/src/verify-state.ts`.)

## Optional `defaultBranch`

`.agent/config.json` may include **`"defaultBranch": "main"`** (or `"master"`, etc.) so **maintaining** branch guard knows the protected name without consulting `origin/HEAD`. Omit it when the remote default is discoverable or `main` is correct. Non-breaking for older configs.

## package.json inference (new config.json only)

When creating a **new** `config.json` from the scaffold template:

- `has(script)` = `package.json` has non-empty `scripts[script]`.
- `run(x)` = `npm run x`.
- Prefer `taskCheck`: if `test` exists → `npm run test`. If `check` exists and no test yet → `npm run check`.
- Prefer `check`: if `check` exists → `npm run check`; else if `lint` and `test` → `npm run lint && npm run test`; else if `test` → `npm run test`. Fill the other field if still empty so both are non-null when any script matched.

## Platform overlays (from global `platforms.json`)

Read **`$G/platforms.json`** → `platforms[]` (written at **`/daf-onboard`**). For **each** id in that array that has a staged template at **`$G/platforms/<id>/project/`**, recursively merge that directory into the **repository root** (merge-safe; use **`--force`** semantics only when the user asked to refresh overlays).

| Platform | Staged template | Repo result (v1) |
|----------|-----------------|------------------|
| **`cursor`** | `$G/platforms/cursor/project/` | `.cursor/rules/daf.mdc`, `.cursor/rules/graphify.mdc` |
| **`claude`** | `$G/platforms/claude/project/` | `.claude/rules/daf.md` |
| **`codex`** | (no project tree) | Repo-root **`AGENTS.md`** from `$G/root-AGENTS.md` (step 2a/3) — Codex reads `AGENTS.md` |
| **`generic`** | — | No overlay; flat skills at `$G/skills/daf-*.md` |

**Do not** put `platform` or `platforms` in committed **`.agent/config.json`**.

From the DAF repo during development, the agent may run `node -e` importing `applyProjectOverlays` from built `packages/cli` — otherwise merge directories manually as above.

## Stop condition

- **Greenfield:** `.agent/` scaffold present, `verify-state.json`, IDE overlays applied for every platform in `$G/platforms.json`; **`/daf-grill-me`** not required to finish `/daf-setup`.
- **Brownfield:** `.agent/` reflects the agreed mental model (docs populated from the session where applicable), `verify-state.json` if needed, overlays applied; next step is planning work or **`/daf-phase-transition`** when exit criteria pass.
