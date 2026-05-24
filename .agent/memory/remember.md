# Remember

Standing instructions for the agent on **this project**. Add via `/remember`.

<!-- Example: - Always use npm, not pnpm, in this repo. -->

- The `daf` CLI stays decoupled from agent runtime: templating and managing DAF structure only (config, phases, stacks, templates)—no LLM and no running agents; organization so IDE agents load context correctly.
- Do not call out or summarize updates to documentation or rules in replies unless the user explicitly asked for those edits or asked what changed.
