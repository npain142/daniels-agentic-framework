# Architecture — DAF monorepo

## Modules

| Area | Path | Responsibility |
|------|------|----------------|
| **Install library** | `packages/cli/src/` | `installGlobalAgent`, Cursor skill packaging, config/verify-state helpers, planning-exit checklist. |
| **Global install runner** | `scripts/global-install.mjs` | Thin CLI invoked by agent during `/daf-onboard`; imports built `packages/cli/dist`. |
| **Onboarding script** | `templates/global/onboarding/global-setup.md` | Agent-readable procedure for global setup (paths, verify, handoff to `/daf-setup`). |
| **Config** | `packages/cli/src/config.ts` | Parse/write `.agent/config.json` contract. |
| **Verify state** | `packages/cli/src/verify-state.ts` | `buildInitialVerifyState` for tests; agents mirror in `/daf-setup`. |
| **Global install** | `packages/cli/src/global-install.ts` | Copy `templates/global`, write `daf-*.md` skills from manifest, stacks, scaffold. |
| **Cursor install** | `packages/cli/src/platforms/cursor.ts` | Build `~/.cursor/skills/daf-*/SKILL.md` + platform project overlay. |
| **Checklist** | `packages/cli/src/checklists/planning-to-developing.ts` | `validatePlanningExit` thresholds for leaving planning. |
| **Paths** | `packages/cli/src/paths.ts` | Repo root, `DAFE_GLOBAL_ROOT`, `DAF_CURSOR_SKILLS_ROOT`. |
| **Templates** | `templates/` | Source of truth; copied to `~/.config/agent/` on `/daf-onboard`. |

## Boundaries

- **Install tooling must not** embed LLM clients, run agents, or make network calls.
- **Agents** read/write `.agent/config.json` per skills; they do not invent phase or stack.
- **`/daf-onboard`** is machine-wide; **`/daf-setup`** is per-repo (greenfield scaffold or brownfield interview).
- **Templates** in repo are canonical; `~/.config/agent/` is an installed copy.

## Data flow

```mermaid
flowchart LR
  subgraph repo [DAF monorepo]
    T[templates/]
    R[scripts/global-install.mjs]
    LIB[packages/cli]
  end
  subgraph home [User home]
    GC["~/.config/agent"]
    CS["~/.cursor/skills"]
  end
  subgraph project [Consumer repo]
    AG[".agent/"]
    CUR[".cursor/rules"]
  end
  onboard["/daf-onboard skill"]
  T --> onboard
  onboard --> R
  R --> LIB
  LIB --> GC
  LIB --> CS
  setup["/daf-setup skill"]
  GC --> setup
  setup --> AG
  setup --> CUR
```

## Tests

Vitest unit tests co-located as `*.test.ts`. Use temp dirs and `DAFE_GLOBAL_ROOT` / `DAF_CURSOR_SKILLS_ROOT` for isolation.
