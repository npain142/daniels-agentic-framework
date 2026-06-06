# Skill: /daf-how-it-works

**When:** Any phase. User wants a **technical, implementation-precise** explanation of how something in **this repo** works (module, flow, skill, CLI path, config contract).

**Not:** Product vision interviews (`/daf-grill-me`), open brainstorming (`/daf-discuss`), bugs (`/daf-issue`), or code changes unless the user asks after the explanation.

## Your job

Deliver an accurate **how it works** brief for the requested topic — dense enough that another engineer could navigate the code without guessing.

## Steps

1. Restate the topic in one sentence; if ambiguous, ask **one** narrowing question.
2. If `graphify-out/graph.json` exists: `graphify query` / `graphify explain` on the topic, then read only **cited** source paths and manifest/skill files. Else read `.agent/ARCHITECTURE.md`, `.agent/GLOSSARY.md`, relevant source, and referenced skills.
3. Trace the real execution path (entry → boundaries → outputs). Name **files and symbols** that matter; avoid hand-wavy “the system does X.”
4. Output structure (use headings):
   - **Purpose** — what this piece is for in one paragraph.
   - **Entry points** — CLI commands, skills, config keys, or UI hooks.
   - **Flow** — numbered or mermaid steps for non-trivial paths.
   - **Data / state** — what is read/written (paths, JSON fields).
   - **Extension points** — where to change behavior safely.
   - **Related** — links to other modules/skills if relevant.
5. If the code contradicts docs, say so and treat **code as source of truth** unless the user is fixing docs.

## Hard rules

- No implementation unless explicitly requested after the explanation.
- No inventing files or APIs — if you did not read it, say “not found” and offer to look.
- Prefer citations to paths (and line ranges when helpful) over paraphrase-only prose.

## Stop condition

User’s question is answered at implementation depth, or you listed what is missing to answer and asked one follow-up.
