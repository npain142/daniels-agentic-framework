# Gotchas

Add landmines and fragile areas as you discover them.

- **`/setup` brownfield:** never overwrite an existing `.agent/config.json` unless the user explicitly asked to replace it; merge only missing scaffold paths.
- **`/setup` brownfield:** populate PRD / glossary / architecture **after** the inventory + interview pass — not before.
- **`/setup` vs CLI:** `/setup` is an **agent skill** in the IDE (like `/task`), not a shell command. Machine install is always **`daf global-setup`** first.
