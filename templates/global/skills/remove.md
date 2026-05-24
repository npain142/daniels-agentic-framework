# Skill: /remove

**When:** Any phase. The user wants to **strip DAF from the current repository** — project `.agent/`, root bootstrap `AGENTS.md`, and Cursor overlay files added by **`/setup`**.

**Not** machine-wide uninstall — use **`/remove-global`**.

**Destructive:** Requires **explicit user confirmation** before deleting anything (AGENTS.md always-on rule). Do not commit or push as part of this skill.

## Step 0 — Confirm intent

1. Restate in one sentence: this removes DAF project structure from **this repo only**; globals under `~/.config/agent/` stay unless the user runs **`/remove-global`** separately.
2. Ask the user to confirm (e.g. “yes, remove project DAF”) before any `rm` or delete.

## Step 1 — Inventory

From the **repository root** (walk up to find `.agent/config.json` if the session cwd is nested):

| Path | Action |
|------|--------|
| `.agent/` | Remove entire directory (all phases, memory, verify-state, docs). |
| `AGENTS.md` at repo root | Remove **only if** it is the DAF bootstrap file: matches `~/.config/agent/root-AGENTS.md`, or is only the one-line pointer to `.agent/AGENTS.md` from **`/setup`**. If the user merged custom content into root `AGENTS.md`, **ask** before deleting. |
| `.cursor/rules/daf.mdc` | Remove this file if present (Cursor overlay from **`/setup`**). Do **not** delete other `.cursor/` content. |

List every path you plan to delete; note anything skipped and why.

## Step 2 — Remove (after confirmation)

1. `rm -rf` the `.agent/` directory (or equivalent delete).
2. Delete root `AGENTS.md` and `.cursor/rules/daf.mdc` per the table above.
3. Re-list the repo root briefly to confirm targets are gone.

## Stop condition

Confirmed paths are removed (or user accepts leaving a named file, e.g. customized root `AGENTS.md`).
