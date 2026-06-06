# Skill: /daf-discuss

**When:** Any phase. Explore a topic, idea, improvement direction, or tradeoff with the agent — **not** a bug (`/daf-issue`), a ranked implementation plan (`/daf-improvement`), a PRD interview (`/daf-grill-me`), or building net-new capability (`/daf-new-feature`).

**Discuss vs other skills**

| Use `/daf-discuss` | Use instead |
|----------------|-------------|
| Brainstorm, debate options, refine a vague idea | `/daf-improvement` — you know what to enhance and want it built |
| Think through “should we?” before committing | `/daf-grill-me` (planning) — ready to lock PRD sections |
| DAF overview | `/daf-help` |
| Understand how code works | `/daf-how-it-works` |
| Realign intent vs docs in dev | `/daf-grill-me` (developing — realignment) |
| Realign vs Notion / external LTM | `/daf-ltm-checkup` |
| Compare approaches conversationally | `/daf-new-feature` — ready to implement new capability |
| Decide whether to replace an existing design | `/daf-pivot` — committed to restructure or redesign |

Prefer dialogue over long ranked lists unless the user asks to compare options.

## Steps

1. Restate the topic in one sentence; ask **one** clarifying question only if scope is unclear.
2. When the topic touches this repo, load context **KG-first** (`.agent/AGENTS.md` §2.1) or read canon files only if the graph is missing.
3. Discuss: options, tradeoffs, risks, alternatives; challenge assumptions when useful.
4. **Do not implement** or edit project files unless the user asks.
5. End with optional handoffs when relevant: `/daf-help` for framework overview; `/daf-grill-me` (planning or realignment); `/daf-how-it-works` for code explanation; `/daf-ltm-checkup` for external memory; `/daf-pivot`; `/daf-improvement`; `/daf-new-feature`; `/daf-backlog-add` to park an idea; `/daf-backlog-work` when ready to build the next backlog item; `/daf-start` when ready to build.

## Stop condition

The user has a clearer shared understanding; optional next skill is named if the conversation reached a decision point.
