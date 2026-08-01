# @daniels-agent-framework/cli

Machine bootstrap and status for [Daniels Agentic Framework (DAF)](https://github.com/daniel-feustel/daniels-agent-framework).

## Install

```bash
npm install -g @daniels-agent-framework/cli
```

User-local prefix (no sudo):

```bash
npm install -g @daniels-agent-framework/cli --prefix ~/.local
```

## Commands

```bash
daf onboard --platforms generic,cursor   # ~/.config/agent/ + IDE skills
daf health                                 # phase, tasks, KG, version
daf version-check                          # ok | global-stale | project-stale
daf --version
```

## After onboard

Open any project in your IDE and run **`/daf-setup`** in chat.

See the [main README](https://github.com/daniel-feustel/daniels-agent-framework#quick-start-first-time-ever) for the full phase path.
