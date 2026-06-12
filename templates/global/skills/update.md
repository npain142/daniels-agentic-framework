# Skill: /daf-update

**When:** Refresh DAF templates in the **current project** after **`/daf-onboard`** (or when pins differ). Not machine uninstall — use **`/daf-remove-global`**. Not first-time project bootstrap — use **`/daf-setup`**.

## Step 0 — One-line check (no tokens)

From the project repo (or any subdirectory):

```bash
node ~/.config/agent/daf-version-check.mjs
```

Honor **`DAFE_GLOBAL_ROOT`** if set instead of `~/.config/agent`. When developing DAF itself, from the DAF repo:

```bash
node scripts/daf-version-check.mjs
```

Optional: set **`DAF_REPO=/path/to/daf-clone`** (or `--repo`) so **`global-stale`** compares `~/.config/agent/daf-pin` to that clone’s `git rev-parse HEAD`.

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
