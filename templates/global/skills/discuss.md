# Skill: /discuss

**When:** Any phase. Explore a topic, idea, improvement direction, or tradeoff with the agent — **not** a bug (`/issue`), a ranked implementation plan (`/improvement`), a PRD interview (`/grill-me`), or building net-new capability (`/new-feature`).

**Discuss vs other skills**

| Use `/discuss` | Use instead |
|----------------|-------------|
| Brainstorm, debate options, refine a vague idea | `/improvement` — you know what to enhance and want it built |
| Think through “should we?” before committing | `/grill-me` — ready to lock PRD sections |
| Compare approaches conversationally | `/new-feature` — ready to implement new capability |
| Decide whether to replace an existing design | `/pivot` — committed to restructure or redesign |

Prefer dialogue over long ranked lists unless the user asks to compare options.

## Steps

1. Restate the topic in one sentence; ask **one** clarifying question only if scope is unclear.
2. Read `.agent/ARCHITECTURE.md`, `.agent/GLOSSARY.md`, and relevant context when the topic touches this repo.
3. Discuss: options, tradeoffs, risks, alternatives; challenge assumptions when useful.
4. **Do not implement** or edit project files unless the user asks.
5. End with optional handoffs when relevant: `/grill-me` or PRD work; `/pivot` to restructure or redesign; `/improvement` to enhance existing behavior; `/new-feature` for net-new capability.

## Stop condition

The user has a clearer shared understanding; optional next skill is named if the conversation reached a decision point.
