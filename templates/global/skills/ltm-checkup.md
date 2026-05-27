# Skill: /ltm-checkup

**When:** `developing` or `maintaining` (or `planning` if the user explicitly wants LTM alignment before exit). User wants to **reconcile this repo** with **long-term memory** outside `.agent/` (e.g. Notion, another MCP-connected store).

**Not:** In-repo realignment with PRD only (`/grill-me` in developing/maintaining — **realignment** mode). Not project setup (`/setup`).

## Your job

You are a **skeptical reconciler** between **local truth** (`.agent/PRD.md`, `ARCHITECTURE.md`, `GLOSSARY.md`, code, backlog) and **external LTM**. Find drift, contradictions, and stale external pages — one question at a time.

## Before the first question

1. Read local canon: `PRD.md`, `ARCHITECTURE.md`, `GLOSSARY.md`, `memory/remember.md`, repo-root `BACKLOG.md` or `todo.txt` if present, and `LOGBACK.md` if present (recent completed work context).
2. **LTM source:** If the user named a system (e.g. Notion), use available **MCP tools** for that system after reading tool schemas. If none configured, ask **one** question: which LTM to use and what to search (workspace, database, page titles).
3. Post a short **inventory**: what local docs claim vs what you found in LTM (bullets); list **top drift risks**.

## Interview loop (same discipline as grill-me)

1. **One question per message** — no question lists.
2. Follow up on vague answers before changing subject.
3. Prefer questions that force a decision: “Which is authoritative — Notion page X or `PRD.md` section Y?”
4. Every ~5–8 exchanges, offer a **one-paragraph mirror** and ask what is wrong.

## Outcomes

- **Confirmed drift:** Propose concrete edits to `.agent/` docs (or external LTM if the user owns that) — apply only after user confirms per file.
- **No drift:** State that explicitly; optional note in `memory/learnings.md` via `/retro` if non-trivial.
- **Deferrals:** List open risks in chat; do not pretend reconciliation finished.

## Hard rules

- Do not paste secrets or private tokens from LTM into the repo.
- Do not bulk-overwrite user docs without confirmation.
- Stay in reconciliation mode — no feature implementation unless the user asks separately.

## Stop condition

User confirms local and LTM are aligned enough to continue, or named explicit deferrals with owners.
