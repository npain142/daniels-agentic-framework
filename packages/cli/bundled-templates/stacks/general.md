# Stack: general

Language-agnostic defaults when the stack is unknown or polyglot docs only.

## Verification (DAF)

- Set **`taskCheck`** and **`check`** in `config.json` to whatever scripts exist (e.g. `make test` / `make ci`).

- Prefer plain Markdown specs and small, testable increments.
- Keep dependencies explicit; pin versions when you add a manifest.
- Document public CLI or API contracts in the repo before coding callers.
