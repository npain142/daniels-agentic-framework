import { installManifestSkillsAsSkillMd } from "./install-skills.js";

export async function installClaudeGlobalSkills(opts: {
  templatesRoot: string;
  skillsRoot: string;
  force: boolean;
}): Promise<void> {
  await installManifestSkillsAsSkillMd(opts);
}
