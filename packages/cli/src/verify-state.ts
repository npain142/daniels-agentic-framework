import { writeFile } from "node:fs/promises";
import { join } from "node:path";

/** Written to `.agent/verify-state.json`; updated by the agent per `/task`. */
export type VerifyState = {
  taskCount: number;
  codebaseCheckPending: boolean;
  lastCodebaseSnapshotAt: string | null;
};

export function buildInitialVerifyState(
  initialTaskCount: number,
  codebaseEvery: number,
): VerifyState {
  const every = Math.max(1, codebaseEvery);
  const seed = Math.max(0, initialTaskCount);
  const pending = seed > 0 && seed % every === 0;
  return {
    taskCount: seed,
    codebaseCheckPending: pending,
    lastCodebaseSnapshotAt: null,
  };
}

export async function writeVerifyState(agentDir: string, state: VerifyState): Promise<void> {
  const path = join(agentDir, "verify-state.json");
  await writeFile(path, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}
