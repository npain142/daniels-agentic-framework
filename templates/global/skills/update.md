# Skill: /daf-update

**When:** Refresh DAF templates in the **current project** after **`/daf-onboard`**, when **`daf.mdc`** / **`daf.md`** step 0 detected staleness and the user agreed, or when pins differ and the user asked. Not machine uninstall — use **`/daf-remove-global`**. Not first-time project bootstrap — use **`/daf-setup`**.

**Automatic detection:** **`daf.mdc`** / **`daf.md`** step 0 runs the one-line check every session and prompts once if stale — you normally reach this skill via that prompt, not manual invocation.

## Step 0 — One-line check (no tokens)

From the project repo (or any subdirectory):

```bash
node ~/.config/agent/daf-version-check.mjs
```

Honor **`DAFE_GLOBAL_ROOT`** if set instead of `~/.config/agent`. When developing DAF itself, from the DAF repo:

```bash
node scripts/daf-version-check.mjs
```

**`global-stale`** compares `~/.config/agent/daf-pin` to `git rev-parse HEAD` at the path in **`~/.config/agent/daf-repo`** (written at **`/daf-onboard`**). Override with **`DAF_REPO`** or `--repo`.

| Output | Meaning |
|--------|---------|
| **`ok`** | Project matches global install; global matches local DAF clone when `--repo` / `DAF_REPO` is set. |
| **`global-stale`** | Run **`/daf-onboard`** with `--force` from an updated DAF repo (agent runs `global-install`). |
| **`project-stale`** | Global was updated; project overlays/scaffold lag. Continue below. |
| **`both-stale`** | Onboard first, then project refresh. |

Shell fallback (project vs global only, no DAF repo):

```bash
cmp -s .agent/daf-pin ~/.config/agent/daf-pin || echo project-stale
```

## Step 1 — Refresh globals if needed

If check was **`global-stale`** or **`both-stale`**: run **`/daf-onboard`** (`--force`) from the DAF monorepo, then re-run the one-line check.

## Step 2 — Refresh project

When output is **`project-stale`** or **`both-stale`** (after step 1):

1. From the **DAF repo** (agent runs shell — not the user):

```bash
node scripts/daf-project-update.mjs --cwd <project-root> [--force]
```

`--force` overwrites scaffold-shaped files under `.agent/` **except** `config.json` and user memory. Default: merge missing scaffold paths only; always re-apply IDE overlays.

2. If not in the DAF repo: merge overlays manually per **`/daf-setup`** platform table (force), merge missing scaffold files from `$G/scaffold/`, then copy pin:

```bash
cp ~/.config/agent/daf-pin .agent/daf-pin
```

## What is pinned

| File | Written by |
|------|------------|
| `~/.config/agent/daf-pin` | `global-install` at **`/daf-onboard`** (DAF repo `git rev-parse HEAD`) |
| `.agent/daf-pin` | **`/daf-setup`**, **`/daf-project-update`**, or copy from global |

Single line: 40-char git SHA. No JSON, no semver.

## Stop condition

`daf-version-check` prints **`ok`** (with `DAF_REPO` set when you care about global vs latest clone), or user accepts staying on current pins.
