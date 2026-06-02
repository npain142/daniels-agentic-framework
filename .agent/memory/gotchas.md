# Gotchas

Add landmines and fragile areas as you discover them.

- Do not put `platform` / `platforms` in committed `.agent/config.json` — IDE list lives in `~/.config/agent/platforms.json` from `/daf-onboard`.
- Product name is **Daniels Agentic Framework** (DAF), not “Daniel Agent Framework”.
- Planning exit requires **`kg-bootstrap.json`** (`status: ok`) — bootstrap domain graph before setting `developing`; code-only `graphify update` is not enough alone.
- `kg:*` scripts never call LLMs; semantic graph passes are agent `/graphify` or `/daf-kg-ingest`, not `npm run kg:bootstrap` alone.
