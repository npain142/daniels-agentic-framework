# Stack: typescript-react

TypeScript plus React (SPA or Next-style apps). Use together with `typescript.md` rules.

## Verification (DAF)

- Same defaults as **typescript** when **`config.stack`** is **`typescript-react`** and the agent fills missing `taskCheck`: `npm run test` / `npm run check` if those scripts exist.

- Prefer server components or server rendering when the framework supports it; add `"use client"` only where needed.
- Avoid `useEffect` for derived state—compute during render or via selectors.
- Keep components small; lift state deliberately; colocate stories/tests when using a UI harness.
- No barrel files unless the repo already standardized them.
