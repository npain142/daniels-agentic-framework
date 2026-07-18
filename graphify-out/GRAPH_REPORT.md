# Graph Report - Daniels Agent Framework  (2026-07-18)

## Corpus Check
- 109 files · ~31,155 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 894 nodes · 1325 edges · 88 communities (76 shown, 12 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 95 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `27d5a7c7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]

## God Nodes (most connected - your core abstractions)
1. `AGENTS.md (project)` - 26 edges
2. `Phase: developing` - 25 edges
3. `installGlobalAgent()` - 22 edges
4. `Phase: maintaining` - 22 edges
5. `Phase: maintaining` - 21 edges
6. `Phase: developing` - 21 edges
7. `compilerOptions` - 17 edges
8. `Phase: planning` - 17 edges
9. `Skill: /daf-backlog-add` - 16 edges
10. `/daf-setup` - 16 edges

## Surprising Connections (you probably didn't know these)
- `AGENTS.md (project)` --semantically_similar_to--> `AGENTS.md (repo root)`  [INFERRED] [semantically similar]
  .agent/AGENTS.md → AGENTS.md
- `AGENTS.md (project)` --semantically_similar_to--> `AGENTS.md (scaffold)`  [INFERRED] [semantically similar]
  .agent/AGENTS.md → templates/global/scaffold/AGENTS.md
- `parseArgs()` --calls--> `getRepoRoot()`  [INFERRED]
  scripts/daf-version-check.mjs → packages/cli/src/paths.ts
- `sources` --references--> `Domain graph`  [INFERRED]
  .agent/graphify.config.json → .agent/GLOSSARY.md
- `local.json (machine-local platforms)` --semantically_similar_to--> `platforms.json`  [AMBIGUOUS] [semantically similar]
  .agent/memory/codebase-snapshot.md → .agent/GLOSSARY.md

## Import Cycles
- 2-file cycle: `packages/cli/src/platforms/cursor.ts -> packages/cli/src/platforms/install-skills.ts -> packages/cli/src/platforms/cursor.ts`

## Hyperedges (group relationships)
- **Planning exit domain graph bootstrap and receipt** — phases_planning_kg_exit_criterion, phases_planning_graphify_config_required, agent_graphify_config_bootstrap_sources, agent_glossary_kg_bootstrap, agent_kg_bootstrap_receipt, agent_kg_bootstrap_status_ok, skill_daf_phase_transition, skill_daf_start, agent_glossary_phase_planning, agent_glossary_phase_developing [EXTRACTED 1.00]
- **Graphify two-layer knowledge graph (domain + code)** — agent_glossary_knowledge_graph, agent_glossary_domain_graph, agent_glossary_code_graph, agent_architecture_merged_graph_json, agent_graphify_config_document, agent_glossary_kg_bootstrap, agent_glossary_kg_ingest, skill_daf_kg_ingest, phases_developing_kg_refresh_rules [EXTRACTED 1.00]

## Communities (88 total, 12 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.16
Nodes (16): installCodexGlobalAgents(), platformArgs, usage(), copyDirMerge(), copyGlobalTemplateExcludingSkills(), hasIdePlatform(), installGlobalAgent(), InstallGlobalAgentOpts (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.33
Nodes (10): Phase Model, Code graph layer, Code graph, Domain graph, Knowledge graph (KG), Phase, developing Phase, maintaining Phase (+2 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (43): check, Codebase Check, taskCheck, fingerprints, AGENTS.md, ARCHITECTURE.md, GLOSSARY.md, phases/developing.md (+35 more)

### Community 3 - "Community 3"
Cohesion: 0.22
Nodes (8): grill-me, description, name, name, remember, description, name, /daf-phase-transition

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (29): devDependencies, eslint, @eslint/js, @types/node, typescript, typescript-eslint, vitest, exports (+21 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (31): at, command, graph, domainNodes, edges, nodes, sources, status (+23 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (24): check, codebaseEvery, initialTaskCount, phase, stack, taskCheck, compilerOptions, declaration (+16 more)

### Community 7 - "Community 7"
Cohesion: 0.24
Nodes (19): archiveDocs, args, codeOnly, ensureConfig(), main(), writeReceipt, loadIngestState(), main() (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (18): 1 — Clone and open this repo, 2 — Machine setup: `/daf-onboard`, 3 — Project setup: `/daf-setup`, 4 — Run the phase path, 5 — Day-to-day (by intent), Daniels Agentic Framework (DAF), `developing` — your fast build loop, Guided start (first time ever) (+10 more)

### Community 9 - "Community 9"
Cohesion: 0.20
Nodes (12): ChecklistResult, hasRealSection(), KgBootstrapReceipt, agentFixture(), validateKgBootstrap(), validatePlanningExit(), DafConfig, parseConfig() (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (13): Backlog, Logback, Learnings, Backlog, In progress, Open, Entries, Logback (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (13): .agent/memory/remember.md, /daf-pivot, Skill: /daf-pivot, Steps, Stop condition, /daf-remember, Skill: /daf-remember, Steps (+5 more)

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (11): $G/scaffold/ project scaffold, Machine-wide onboard must precede per-repo setup, /daf-onboard, scripts/global-install.mjs, Brownfield adoption, /daf-setup, Greenfield scaffold, verify-state.json initialization (+3 more)

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (7): Best practices, Check current state, Configure, Skill: /daf-linear-setup, Steps, Stop condition, Write config

### Community 14 - "Community 14"
Cohesion: 0.06
Nodes (30): backlog-add, description, name, backlog-work, description, name, how-it-works, description (+22 more)

### Community 15 - "Community 15"
Cohesion: 0.05
Nodes (48): 1. Two pillars, 2.1 KG-first canon (when the graph exists), 2. Load order (every session), 3. Layout (lean), 4. Skills (v1), 5. Always-on rules, 6. For humans, AGENTS.md (project) (+40 more)

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (12): codebaseEvery, defaultBranch, Global setup, Glossary (starter), Hotfix exception, initialTaskCount, Maintaining bar, Phase (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.13
Nodes (20): Skill: /daf-backlog-add, Hard rules, Linear mode (`integrations` includes `"linear"`), Markdown mode (default), Skill: /daf-backlog-add, Steps, Stop condition, Close (user accepts) (+12 more)

### Community 18 - "Community 18"
Cohesion: 0.14
Nodes (21): Codebase-check (two phases), Phase: developing, Before the first question, Skill: /daf-ltm-checkup, Hard rules, Interview loop (same discipline as grill-me), Outcomes, Skill: /daf-ltm-checkup (+13 more)

### Community 19 - "Community 19"
Cohesion: 0.36
Nodes (9): installClaudeGlobalSkills(), buildSkillMdBody(), installCursorGlobalSkills(), installFlatMarkdownSkills(), loadSkillManifest(), SkillManifest, SkillManifestEntry, stripSkillTitle() (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.29
Nodes (10): Realignment, Active skills, Allowed, Definition of done (exit to developing or maintaining), Forbidden, Merge / release, Phase: planning, Purpose (+2 more)

### Community 21 - "Community 21"
Cohesion: 0.20
Nodes (10): Optional `defaultBranch`, package.json inference (new config.json only), Platform overlays (from global `platforms.json`), Skill: /daf-setup, Step 0 — Detect, Step 1 — Globals, Step 2a — Greenfield (scaffold only), Step 2b — Brownfield adoption (interview before populated structure) (+2 more)

### Community 22 - "Community 22"
Cohesion: 0.20
Nodes (11): Close (user accepts), Hard rules, Implement, Monitor, Multi-issue flow, Single-issue flow, Skill: /daf-linear-work, Spawn subagents (+3 more)

### Community 23 - "Community 23"
Cohesion: 0.53
Nodes (6): claude platform, platforms.json, .claude/rules/daf.md, ~/.claude/skills/daf-*/SKILL.md, daf.md Claude project rules, Claude Code platform README

### Community 24 - "Community 24"
Cohesion: 0.40
Nodes (6): cursor platform, skill-manifest.json, ~/.cursor/skills/daf-*/SKILL.md, remove-global is machine-wide; remove is single-repo only, /daf-remove, /daf-remove-global

### Community 25 - "Community 25"
Cohesion: 0.20
Nodes (10): Before the first question (realignment), Context load (all phases), Skill: /daf-grill-me, Developing / maintaining — realignment, Hard rules (realignment), Product grill (planning), Realignment (developing/maintaining), Realignment loop (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.22
Nodes (9): Checklist (must match `validatePlanningExit` in DAF repo), Files present, GLOSSARY.md / ARCHITECTURE.md, Knowledge graph bootstrap receipt, PRD.md, Skill: /daf-phase-transition, Stack, v1 behavior (+1 more)

### Community 27 - "Community 27"
Cohesion: 0.22
Nodes (8): 1. Two pillars, 2. Load order (every session), 3. Layout (lean), 4. Skills (v1), 5. Always-on rules, 6. For humans, Agent entry, AGENTS.md (project)

### Community 28 - "Community 28"
Cohesion: 0.20
Nodes (12): Codex platform, codex platform, ~/.config/agent (DAFE_GLOBAL_ROOT), .agent/ project directory, ~/.codex/AGENTS.md, .cursor/rules/daf.mdc, repo-root AGENTS.md, Codex global AGENTS.md (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (8): 1. Two pillars, 2.1 KG-first canon (when the graph exists), 2. Load order (every session), 3. Layout (lean), 4. Skills (v1), 5. Always-on rules, 6. For humans, AGENTS.md (project)

### Community 30 - "Community 30"
Cohesion: 0.25
Nodes (7): bootstrap, minDomainNodes, sources, ingest, canonicalSources, codeCommand, outputDir

### Community 31 - "Community 31"
Cohesion: 0.22
Nodes (14): Phase: maintaining, Active skills, Allowed, Branch guard, Definition of done (session task), Forbidden, Implementation standards, Merge to main (+6 more)

### Community 32 - "Community 32"
Cohesion: 0.33
Nodes (9): /daf-phase-transition includes KG bootstrap, Domain graph layer, KG bootstrap, kg-bootstrap.json (planning-exit receipt), kg-bootstrap.json status: ok, Planning Exit Criteria, Planning exit: domain graph bootstrapped with valid kg-bootstrap.json, /daf-phase-transition (+1 more)

### Community 33 - "Community 33"
Cohesion: 0.29
Nodes (6): 0 — Resolve paths, 1 — Mechanical install (preferred), 2 — Manual install (fallback), 3 — Verify, Onboarding script: global setup, Stop condition

### Community 34 - "Community 34"
Cohesion: 0.29
Nodes (6): check, codebaseEvery, initialTaskCount, phase, stack, taskCheck

### Community 35 - "Community 35"
Cohesion: 0.33
Nodes (5): at, fingerprints, ARCHITECTURE.md, GLOSSARY.md, PRD.md

### Community 36 - "Community 36"
Cohesion: 0.25
Nodes (8): bootstrap, minDomainNodes, sources, ingest, canonicalSources, codeCommand, outputDir, Planning exit: graphify.config.json present

### Community 37 - "Community 37"
Cohesion: 0.25
Nodes (8): generic platform (flat daf-*.md skills), Skill: /daf-onboard, Step 0 — Detect, Step 1 — Ask platforms, Step 2 — Run the onboarding script, Step 3 — Verify and handoff, Step 1 — Ask platforms, Stop condition

### Community 38 - "Community 38"
Cohesion: 0.33
Nodes (5): Skill: /daf-remove, Step 0 — Confirm intent, Step 1 — Inventory, Step 2 — Remove (after confirmation), Stop condition

### Community 39 - "Community 39"
Cohesion: 0.29
Nodes (6): Skill: /daf-remove-global, Step 0 — Confirm intent, Step 1 — Inventory, Step 2 — Remove (after confirmation), Step 3 — Verify, Stop condition

### Community 40 - "Community 40"
Cohesion: 0.31
Nodes (8): Phase: planning, Active skills, Allowed, Definition of done (exit to developing or maintaining), Forbidden, Merge / release, Phase: planning, Purpose

### Community 41 - "Community 41"
Cohesion: 0.60
Nodes (4): Skill: /daf-improvement, Skill: /daf-improvement, Steps, Stop condition

### Community 42 - "Community 42"
Cohesion: 0.22
Nodes (8): Architecture anchors, Codebase snapshot, Drift / cleanup candidates, Learnings, Stack constraints, Standing rules, Traps, Ubiquitous language

### Community 43 - "Community 43"
Cohesion: 0.25
Nodes (8): Architecture — DAF monorepo, Boundaries, Data flow, Knowledge graph (Graphify), graphify-out/graph.json (merged layers), Modules, Tests, graphify-out/

### Community 44 - "Community 44"
Cohesion: 0.50
Nodes (3): codebaseCheckPending, lastCodebaseSnapshotAt, taskCount

### Community 45 - "Community 45"
Cohesion: 0.17
Nodes (19): checkDafVersion(), DAF_MONOREPO_MARKER, DafVersionStatus, formatStatusLine(), isDafMonorepo(), normalizePin(), readDafRepoPath(), readPin() (+11 more)

### Community 46 - "Community 46"
Cohesion: 0.22
Nodes (7): agentDir, { cwd, repoRoot }, { cwd, repoRoot: repoArg }, globalDir, here, parseArgs(), status

### Community 47 - "Community 47"
Cohesion: 0.43
Nodes (7): KG scripts (kg-bootstrap.mjs, kg-ingest.mjs), Install tooling must not embed LLM clients (kg:* AST only), KG ingest, ingest.canonicalSources, kg:* scripts never call LLMs; semantic passes are agent-driven, Developing KG refresh: kg:ingest after code; /daf-kg-ingest after canonical docs, /daf-kg-ingest

### Community 48 - "Community 48"
Cohesion: 0.50
Nodes (4): Hard rules, Skill: /daf-start, Stop condition, Your job

### Community 50 - "Community 50"
Cohesion: 0.50
Nodes (3): Backlog, In progress, Open

### Community 51 - "Community 51"
Cohesion: 0.50
Nodes (3): 2026-05-27 — Short topic, Entries, Logback

### Community 64 - "Community 64"
Cohesion: 0.29
Nodes (4): cwd, globalDir, here, repoRoot

### Community 65 - "Community 65"
Cohesion: 0.29
Nodes (6): Skill: /daf-update, Step 0 — One-line check (no tokens), Step 1 — Refresh globals if needed, Step 2 — Refresh project, Stop condition, What is pinned

### Community 66 - "Community 66"
Cohesion: 0.33
Nodes (6): Goal, Knowledge graph v1 scope, Non-goals, PRD — Daniels Agentic Framework (DAF) v1, Success, v1 scope

### Community 67 - "Community 67"
Cohesion: 0.25
Nodes (8): discuss, description, name, help, description, onboard, description, name

### Community 68 - "Community 68"
Cohesion: 0.20
Nodes (6): agentDir, { cwd, repoRoot }, { cwd, repoRoot: repoArg }, fileRepo, repoRoot, status

### Community 69 - "Community 69"
Cohesion: 0.40
Nodes (4): Banned synonyms, DAF (Daniels Agentic Framework), Deprecated (pivot), Glossary — DAF monorepo

### Community 70 - "Community 70"
Cohesion: 0.22
Nodes (9): Assumption audit (planning — gate before PRD), Before the first question (planning), Hard rules (planning), Interview loop (planning), Planning — product grill, Stop condition (planning), Topic checklist (planning — depth, not tick-box), When an answer is too weak (planning) (+1 more)

### Community 71 - "Community 71"
Cohesion: 0.24
Nodes (12): Platform (IDE), GlobalPlatformsConfig, globalPlatformsPath(), parseGlobalPlatforms(), parsePlatformId(), readGlobalPlatforms(), writeGlobalPlatforms(), getGlobalAgentDir() (+4 more)

### Community 72 - "Community 72"
Cohesion: 0.39
Nodes (7): Fill via /daf-grill-me before leaving planning, Goal, Non-goals, PRD (template), Success, PRD (template), v1 scope

### Community 73 - "Community 73"
Cohesion: 0.43
Nodes (6): Skill: /daf-help, Sections (use these headings), Skill: /daf-help, Skills table (v1), Steps, Stop condition

### Community 74 - "Community 74"
Cohesion: 0.80
Nodes (4): Architecture (starter), Boundaries, Modules, Architecture (starter)

### Community 75 - "Community 75"
Cohesion: 0.48
Nodes (6): Skill: /daf-how-it-works, Hard rules, Skill: /daf-how-it-works, Steps, Stop condition, Your job

### Community 76 - "Community 76"
Cohesion: 0.67
Nodes (3): issue, description, name

### Community 77 - "Community 77"
Cohesion: 0.43
Nodes (5): IDE_PLATFORMS, applyProjectOverlays(), ApplyProjectOverlaysOpts, copyDirMerge(), stashPlatformProjectTemplates()

### Community 79 - "Community 79"
Cohesion: 0.60
Nodes (4): Skill: /daf-discuss, Skill: /daf-discuss, Steps, Stop condition

### Community 80 - "Community 80"
Cohesion: 0.60
Nodes (4): Skill: /daf-new-feature, Skill: /daf-new-feature, Steps, Stop condition

### Community 81 - "Community 81"
Cohesion: 0.67
Nodes (3): kg-ingest, description, name

### Community 82 - "Community 82"
Cohesion: 0.67
Nodes (3): ltm-checkup, description, name

### Community 83 - "Community 83"
Cohesion: 0.67
Nodes (3): pivot, description, name

### Community 84 - "Community 84"
Cohesion: 0.67
Nodes (3): remove, description, name

### Community 85 - "Community 85"
Cohesion: 0.67
Nodes (3): retro, description, name

### Community 86 - "Community 86"
Cohesion: 0.67
Nodes (3): setup, description, name

### Community 87 - "Community 87"
Cohesion: 0.67
Nodes (3): start, description, name

## Ambiguous Edges - Review These
- `platforms.json` → `local.json (machine-local platforms)`  [AMBIGUOUS]
  .agent/memory/codebase-snapshot.md · relation: semantically_similar_to

## Knowledge Gaps
- **358 isolated node(s):** `phase`, `stack`, `taskCheck`, `check`, `codebaseEvery` (+353 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `platforms.json` and `local.json (machine-local platforms)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `platforms.json` connect `Community 15` to `Community 71`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `Platform (IDE)` connect `Community 71` to `Community 15`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `scripts` connect `Community 5` to `Community 0`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `AGENTS.md (project)` (e.g. with `AGENTS.md (repo root)` and `AGENTS.md (scaffold)`) actually correct?**
  _`AGENTS.md (project)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `phase`, `stack`, `taskCheck` to the rest of the system?**
  _359 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06763285024154589 - nodes in this community are weakly interconnected._