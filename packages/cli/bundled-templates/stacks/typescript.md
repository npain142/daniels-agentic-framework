# Stack: typescript

Conventions for Node + TypeScript packages (CLIs, libraries, backend services).

## Verification (DAF)

- Default pair when the agent sets **`config.stack`** to **`typescript`** and `taskCheck` was not in `config.json`: **`taskCheck`:** `npm run test`, **`check`:** `npm run check` (adjust to repo scripts).
- Prefer a failing test before implementation when behavior is non-trivial.
- Extend existing modules and types; extract shared logic instead of duplicating fixes (see **`IDENTITY.md`**).

- `strict: true`; avoid `any`; justify `as` casts.
- Prefer `node:` imports for built-ins.
- ESM (`"type": "module"`) unless the repo standard says otherwise.
- Surface errors with helpful messages at CLI boundaries; exit non-zero on failure.
- Co-locate tests next to source or under `src/__tests__` per repo convention—pick one and stay consistent.
