import { Sandbox } from "@vercel/sandbox";
import { generateText } from "ai";
import { join } from "node:path";

import { envVars } from "@/lib/env-vars";
import { LOGS_DIR } from "@/constants";
import { groq } from "@/lib/groq";

type Message = {
  role: "assistant" | "user";
  content: string;
};

async function main() {
  console.log("Creating sandbox...");
  const sandbox = await Sandbox.create({
    teamId: envVars.VERCEL_TEAM_ID,
    projectId: envVars.VERCEL_PROJECT_ID,
    token: envVars.VERCEL_OIDC_TOKEN,
    runtime: "node24",
    timeout: 600000,
  });
  console.log("Sandbox created.");

  const messages: Message[] = [];

  console.log("Begin agent's loop.");
  for (let turn = 1; turn <= 10 && sandbox.status === "running"; turn++) {
    console.log(`Turn ${turn}...`);
    const { text } = await generateText({
      model: groq("openai/gpt-oss-120b"),
      messages,
    });
    messages.push({ role: "assistant", content: text });

    const result = await sandbox.runCommand("node", ["-e", text]);
    const output = await result.output("both");
    messages.push({ role: "user", content: output });
  }
  console.log("Agent's loop ended.");

  await sandbox.stop();
  console.log("Sandbox stopped.");

  const logContent = JSON.stringify(messages, null, 2);
  const logFilePath = join(LOGS_DIR, "messages.json");
  const bytes = await Bun.write(join(LOGS_DIR, "messages.json"), logContent);
  console.log(`Written ${bytes} bytes of messages data to "${logFilePath}".`);
}

main().catch(console.error);
console.log("Done.");
