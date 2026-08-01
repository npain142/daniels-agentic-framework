# Skill: /daf-health

**When:** Any phase. One-screen status: globals, project phase, verify-state, template freshness, KG presence.

**Not:** Fixing issues (hand off to `/daf-update`, `/daf-onboard`, `/daf-setup`, `/daf-kg-ingest` as hints suggest).

## Steps

1. From repo root (or project root), run:

```bash
npm run daf -- health
```

For a bare `daf` on PATH (optional, once per machine):

```bash
ln -sf "$(pwd)/scripts/daf" ~/.local/bin/daf   # ensure ~/.local/bin is on PATH
daf health
```

2. Present the output as-is (short). Do not bulk-read config files unless `daf health` fails or the user asks for detail.
3. If hints list actions, offer the matching skill once (e.g. stale templates → `/daf-update`).

## Stop condition

User has a clear picture of phase, task count, version status, and KG state.
