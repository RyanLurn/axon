import { Sandbox } from "@vercel/sandbox";

import { envVars } from "@/lib/env-vars";

async function main() {
  const sandbox = await Sandbox.create({
    teamId: envVars.VERCEL_TEAM_ID,
    projectId: envVars.VERCEL_PROJECT_ID,
    token: envVars.VERCEL_OIDC_TOKEN,
  });

  const result = await sandbox.runCommand("echo", [
    "Hello from Vercel Sandbox!",
  ]);
  console.log(await result.stdout());
}

main().catch(console.error);
