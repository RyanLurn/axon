import { Sandbox } from "@vercel/sandbox";

import { envVars } from "@/lib/env-vars";

const script = `const x = 10;
const y = 20;
console.log(\`Sum is: \${x + y}\`);`;

async function main() {
  console.log("Creating the sandbox...");
  const sandbox = await Sandbox.create({
    teamId: envVars.VERCEL_TEAM_ID,
    projectId: envVars.VERCEL_PROJECT_ID,
    token: envVars.VERCEL_OIDC_TOKEN,
    runtime: "node24",
  });
  console.log("Sandbox created.");

  console.log("Running command...");
  const result = await sandbox.runCommand("node", ["-e", script]);
  console.log("Command finished. Result:");
  console.log(await result.stdout());

  await sandbox.stop();
}

main().catch(console.error);
