# Skill: /setup

**When:** **Project setup** — adapt DAF to the **current repo** (greenfield scaffold, brownfield adoption, or Cursor overlay only). This is an **IDE agent skill**, not a shell command.

**Machine prerequisite:** **`daf global-setup`** (add **`--platform cursor`** on Cursor) installs globals under `~/.config/agent/` — skills, stacks, **scaffold**. `/setup` never replaces that step.

**Source of truth** for files to copy or merge is **`~/.config/agent/scaffold/`** (and optional **`~/.config/agent/platforms/cursor/project/`** on Cursor). Do not copy from the DAF monorepo path on disk unless you are developing DAF itself.

**Always** work from **`$G/scaffold/`** where `$G` is `~/.config/agent` (honor env **`DAFE_GLOBAL_ROOT`** if set).

## Step 0 — Detect

| Mode | Signals |
|------|---------|
| **Greenfield** | No `.agent/` (or empty) **and** no meaningful project docs (e.g. no product `README`, no `PRD.md`, no `docs/` with adoption context). |
| **Brownfield adoption** | No `.agent/` but **has** other project docs; **or** partial `.agent/` needing merge; **or** user explicitly adopting DAF on existing work. |
| **Greenfield + existing code** | Greenfield by docs, but non-trivial code exists (e.g. `src/`, app entrypoints, substantial tree): **ask** whether to review existing code; if yes → follow **Brownfield adoption** (inventory → interview → populate) before treating docs as empty. |
| **Platform-only** | `.agent/` + `config.json` already complete → add Cursor overlay if requested, or stop — DAF is present. |

If `.agent/` already exists and is non-empty and the user did **not** ask for brownfield merge or adoption, **stop** unless the case above applies.

## Step 1 — Globals

If `~/.config/agent/scaffold/config.json` is missing (or **`~/.config/agent/skills/daf-setup.md`** is missing), instruct the user to run **`daf global-setup`** once on the machine. On Cursor, use **`daf global-setup --platform cursor`** so skills and platform files exist.

## Step 2a — Greenfield (scaffold only)

1. Recursively copy `$G/scaffold/` → `<repo>/.agent/`.
2. Write **`verify-state.json`** (see below).
3. If `<repo>/AGENTS.md` is missing and **`$G/root-AGENTS.md`** exists, copy that file to `<repo>/AGENTS.md`. If `$G/root-AGENTS.md` is missing, write a one-line pointer: “Read `.agent/AGENTS.md` then `.agent/config.json`.”
4. If **`$G/root-BACKLOG.md`** exists and the repo root has neither **`BACKLOG.md`** nor **`todo.txt`**, copy to `<repo>/BACKLOG.md`.
5. If **`$G/root-LOGBACK.md`** exists and the repo root has no **`LOGBACK.md`**, copy to `<repo>/LOGBACK.md`.
6. **Do not** set `config.stack` during setup (remains `null` from scaffold until product clarity).
7. Optional: **Cursor overlay** (see below).

**Handoff:** Structure is ready. **`/grill-me`** is an **optional** next step when the user wants to lock the PRD — not part of this skill’s stop condition. When planning exit criteria pass, use **`/start`** or **`/phase-transition`** to enter developing.

## Step 2b — Brownfield adoption (interview before populated structure)

Order matters: **inventory → shared mental model → files**.

1. **Inventory** (before creating or overwriting user-authored content): read the codebase and existing docs; summarize what you believe (purpose, stack hints, boundaries, gaps).
2. **Interview** — follow the full **`/grill-me`** protocol (skeptical one-question-at-a-time grill; assumption audit before writing PRD content; no inventing details); then recommend **`config.stack`** and confirm (ensure `$G/stacks/<id>.md` exists).
3. **Structure + populate:** merge from `$G/scaffold/`: for each path under scaffold, if the corresponding path under `.agent/` is **missing**, copy it in. **Never overwrite** an existing `.agent/config.json`. If you **create** `config.json` because it was missing, set `phase: "planning"` and `stack: null` until the user agrees on stack, then set **`config.stack`**; apply **package.json inference** (below) for new `config.json` only. Update **`.agent/PRD.md`**, **`.agent/GLOSSARY.md`**, **`.agent/ARCHITECTURE.md`** from the session — replace empty `_TODO_` / stubs where you have answers, do not wipe user edits without explicit consent.
4. **Force refresh:** only if the user explicitly asks; you may overwrite scaffold-shaped files **except** `config.json` and user-authored PRD/memory — confirm when unsure.
5. Write **`verify-state.json`** if missing (see below).
6. Optional: **Cursor overlay** (see below).

**Handoff:** When planning exit criteria are met, **`/start`** or **`/phase-transition`**. Do **not** require a separate **`/grill-me`** after brownfield `/setup` unless gaps remain in the PRD.

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

## Cursor overlay

If the user wants Cursor project rules / `platform: "cursor"`:

1. Ensure **`daf global-setup --platform cursor`** was run (so `$G/platforms/cursor/project/` exists).
2. Merge **`$G/platforms/cursor/project/`** into the **repository root** (recursive; creates `.cursor/rules/`).
3. Set **`"platform": "cursor"`** in `.agent/config.json` (merge; do not drop other keys).

## Stop condition

- **Greenfield:** `.agent/` scaffold present, `verify-state.json`, optional Cursor overlay applied; **`/grill-me`** not required to finish `/setup`.
- **Brownfield:** `.agent/` reflects the agreed mental model (docs populated from the session where applicable), `verify-state.json` if needed, optional Cursor overlay; next step is planning work or **`/phase-transition`** when exit criteria pass.
