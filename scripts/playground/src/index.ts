import { Sandbox } from "@vercel/sandbox";
import { generateText } from "ai";
import { join } from "node:path";

import initialPrompt from "@/resources/prompts/initial.txt";
import systemPrompt from "@/resources/prompts/system.txt";
import mathProblems from "@/resources/math-problems.txt";
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

  console.log("Creating math directory...");
  await sandbox.mkDir("math");
  console.log("Math director created.");

  console.log("Writting problems.txt to math directory...");
  await sandbox.writeFiles([
    { path: "math/problems.txt", content: Buffer.from(mathProblems) },
  ]);
  console.log("Written problems.txt to math directory.");

  const messages: Message[] = [{ role: "user", content: initialPrompt }];

  console.log("Begin agent's loop.");
  for (let turn = 1; turn <= 25 && sandbox.status === "running"; turn++) {
    console.log(`\nTurn ${turn}:`);

    console.log("Generating agent's response...");
    const { text } = await generateText({
      model: groq("openai/gpt-oss-120b"),
      system: systemPrompt,
      messages,
    });
    console.log("Agent responded with:");
    console.log(text);
    messages.push({ role: "assistant", content: text });

    console.log("Running agent's responded code in sandbox...");
    const result = await sandbox.runCommand("node", ["-e", text]);
    const output = await result.output("both");
    console.log("Code execution result:");
    console.log(output);
    messages.push({ role: "user", content: output });

    console.log("Checking for solutions...");
    const stream = await sandbox.readFile({
      path: "solutions.json",
      cwd: "/vercel/sandbox/math",
    });

    if (stream === null) {
      console.log("No solutions found. Agent's loop continues...");
    } else {
      console.log("Solutions found. Writting them to logs directory...");
      const solutionsContent = await new Response(stream).text();
      const solutionsFilePath = join(LOGS_DIR, "solutions.json");
      const bytes = await Bun.write(solutionsFilePath, solutionsContent);
      console.log(
        `Written ${bytes} bytes of solutions data to "${solutionsFilePath}".`
      );
      break;
    }
  }
  console.log("Agent's loop ended.");

  if (sandbox.status !== "stopped") {
    await sandbox.stop();
    console.log("Sandbox stopped.");
  }

  const logContent = JSON.stringify(messages, null, 2);
  const logFilePath = join(LOGS_DIR, "messages.json");
  const bytes = await Bun.write(logFilePath, logContent);
  console.log(`Written ${bytes} bytes of messages data to "${logFilePath}".`);
}

main().catch(console.error);
console.log("Done.");
