# Skill: /remove-global

**When:** The user wants to **uninstall all machine-wide DAF files** installed by **`/onboard`** (global setup).

**Not** per-repo teardown — use **`/remove`** on each project that still has `.agent/`.

**Destructive:** Requires **explicit user confirmation** before deleting anything. Do not commit or push as part of this skill.

## Step 0 — Confirm intent

1. Restate: this removes **`~/.config/agent/`** (or **`DAFE_GLOBAL_ROOT`** if set) and **Cursor `daf-*` skill folders** under `~/.cursor/skills/` (or **`DAF_CURSOR_SKILLS_ROOT`**). Individual repos keep `.agent/` until **`/remove`**.
2. Ask the user to confirm (e.g. “yes, remove global DAF”) before any delete.

## Step 1 — Inventory

Let **`$G`** = `process.env.DAFE_GLOBAL_ROOT` if set and non-empty, else `~/.config/agent`.

Let **`$CS`** = `process.env.DAF_CURSOR_SKILLS_ROOT` if set and non-empty, else `~/.cursor/skills`.

Read **`$G/skill-manifest.json`** if it exists; otherwise read **`templates/global/skill-manifest.json`** from the DAF repo only when developing DAF itself — for normal users, manifest lives under **`$G`**.

| Target | Contents (installed by `/onboard`) |
|--------|------------------------------------------|
| **`$G`** (entire tree) | `IDENTITY.md`, `PREFERENCES.md`, `scaffold/`, `stacks/`, `skills/daf-*.md`, `skill-manifest.json`, `platforms/`, `root-AGENTS.md`, etc. |
| **`$CS/<entry.name>/`** for each manifest entry | e.g. `daf-setup/`, `daf-issue/`, … each with `SKILL.md` (Cursor platform install only) |

List paths that exist; skip missing paths without error.

## Step 2 — Remove (after confirmation)

1. `rm -rf` **`$G`** if it exists.
2. For each `{ name }` in **`skill-manifest.json`** (values’ **`name`** field, e.g. `daf-setup`), `rm -rf` **`$CS/<name>/`** if that directory exists.
3. Do **not** delete **`$CS`** itself or non-`daf-*` skill folders.

## Step 3 — Verify

Confirm **`$G`** is gone and listed **`daf-*`** folders under **`$CS`** are gone. Tell the user they can run **`/onboard`** again to reinstall.

## Stop condition

Global agent dir and Cursor DAF skill folders from the inventory are removed (or user accepts documented exceptions).
