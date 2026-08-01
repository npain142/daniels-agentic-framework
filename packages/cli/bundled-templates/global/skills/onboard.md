# Skill: /daf-onboard

**When:** **Machine-wide global setup** — first-time install, refresh after DAF template changes, or when `~/.config/agent/` (or IDE `daf-*` skills) is missing.

**Not** per-repo setup — use **`/daf-setup`** after globals exist.

**Not** uninstall — use **`/daf-remove-global`**.

## Step 0 — Detect

| Situation | Action |
|-----------|--------|
| **`$G/scaffold/config.json`** and **`$G/skills/daf-setup.md`** exist, user did not ask to refresh | Confirm globals look present; offer **`--force`** refresh only if they want to overwrite. |
| Globals missing or user asked to install/refresh | Continue. |
| User only wants a project | Redirect to **`/daf-setup`** (still needs globals once). |

Let **`$G`** = `DAFE_GLOBAL_ROOT` if set, else `~/.config/agent`.

## Step 1 — Ask platforms

Ask which IDE platforms this machine uses (one or more). v1 ids:

| Id | Installs |
|----|----------|
| **`generic`** | Flat `daf-*.md` under `$G/skills/` only (always installed as part of base) |
| **`cursor`** | `~/.cursor/skills/daf-*/SKILL.md` + stash `$G/platforms/cursor/project/` |
| **`claude`** | `~/.claude/skills/daf-*/SKILL.md` + stash `$G/platforms/claude/project/` |
| **`codex`** | `~/.codex/AGENTS.md` global pointer |

If the user is unsure on **Cursor**, default to including **`cursor`** when running in Cursor. Minimum useful set is often **`generic`** plus the IDEs they actually use.

## Step 2 — Run the onboarding script

1. Read **`templates/global/onboarding/global-setup.md`** from the DAF monorepo when available (walk up to `templates/global/onboarding/global-setup.md`, or use `~/.config/agent/onboarding/global-setup.md` after a prior install).
2. From the **DAF repo root**, you run all shell steps — **never** ask the user to run `npm install`, `npm run build`, or install globals themselves.
   - If `packages/cli/dist/cli.js` is missing (or `node_modules` is missing), run `npm install` then `npm run build`.
   - Prefer the **`daf`** CLI (after build):

```bash
daf onboard --platforms generic,cursor,claude,codex [--force]
```

   - Or the repo script (equivalent):

```bash
node scripts/global-install.mjs --platforms generic,cursor,claude,codex [--force]
```

3. If not in the DAF repo and `daf` is on PATH (e.g. `npm install -g` from a built package), run `daf onboard` with the user's platform ids. Otherwise ask them to clone/open the DAF repo once, or follow **manual fallback** in `global-setup.md` with explicit consent.

## Step 3 — Verify and handoff

Confirm the onboarding script **§3 Verify** table passes. Summarize:

- Global dir path (`$G`)
- Contents of **`$G/platforms.json`**
- Installed skill roots (`~/.cursor/skills`, `~/.claude/skills`, `~/.codex/AGENTS.md` as applicable)

**Handoff:** Run **`/daf-setup`** in each project — it applies `.agent/` and merges IDE overlays for every platform in `platforms.json`.

## Stop condition

Machine-wide install verified; user knows **`/daf-setup`** is the next step for a repo.
