# Skill: /onboard

**When:** **Machine-wide global setup** — first-time install, refresh after DAF template changes, or when `~/.config/agent/` (or Cursor `daf-*` skills) is missing.

**Not** per-repo setup — use **`/setup`** after globals exist.

**Not** uninstall — use **`/remove-global`**.

## Step 0 — Detect

| Situation | Action |
|-----------|--------|
| **`$G/scaffold/config.json`** and **`$G/skills/daf-setup.md`** exist, user did not ask to refresh | Confirm globals look present; offer **`--force`** refresh only if they want to overwrite. |
| Globals missing or user asked to install/refresh | Continue. |
| User only wants a project | Redirect to **`/setup`** (still needs globals once). |

Let **`$G`** = `DAFE_GLOBAL_ROOT` if set, else `~/.config/agent`.

## Step 1 — Run the onboarding script

1. Read **`templates/global/onboarding/global-setup.md`** from the DAF monorepo when available (walk up to `templates/global/onboarding/global-setup.md`, or use `~/.config/agent/onboarding/global-setup.md` after a prior install).
2. Follow that script end-to-end. **Default:** run **`node scripts/global-install.mjs`** from the DAF repo root with **`--platform cursor`** on Cursor, else **`--platform generic`**. Add **`--force`** only when the user asked to overwrite existing files.
3. If not in the DAF repo: ask the user to open/clone the DAF repo for §1 mechanical install, or follow the script’s **manual fallback** with explicit consent.

**Do not** tell the user to run a `daf` CLI command — it no longer exists.

## Step 2 — Verify and handoff

Confirm the **§3 Verify** table in the onboarding script passes. Summarize:

- Global dir path (`$G`)
- Platform (`generic` vs `cursor`)
- Cursor skills root if applicable

**Handoff:** Run **`/setup`** in each project (greenfield or brownfield per that skill).

## Stop condition

Machine-wide install verified; user knows **`/setup`** is the next step for a repo.
