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

## Step 2 — Run onboard

**Preferred** — `daf` on PATH (from `npm install -g @daniels-agent-framework/cli` or `npx`):

```bash
daf onboard --platforms generic,cursor,claude,codex [--force]
```

**DAF monorepo** — you run build/install; never ask the user to:

```bash
npm install && npm run build
daf onboard --platforms generic,cursor,claude,codex [--force]
# or: node scripts/global-install.mjs --platforms ...
```

**No CLI and no monorepo** — ask the user to run once:

```bash
npm install -g @daniels-agent-framework/cli
daf onboard --platforms generic,cursor
```

Or follow **manual fallback** in `global-setup.md` only with explicit consent.

## Step 3 — Verify and handoff

Confirm the onboarding script **§3 Verify** table passes. Summarize:

- Global dir path (`$G`)
- Contents of **`$G/platforms.json`**
- Installed skill roots (`~/.cursor/skills`, `~/.claude/skills`, `~/.codex/AGENTS.md` as applicable)

**Handoff:** Run **`/daf-setup`** in each project — it applies `.agent/` and merges IDE overlays for every platform in `platforms.json`.

## Stop condition

Machine-wide install verified; user knows **`/daf-setup`** is the next step for a repo.
