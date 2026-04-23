import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import z from "zod";

import { mockDb } from "@/features/chat/mock-db.server";
import { groqProvider } from "@/lib/groq.server";

const PromptSchema = z.string().trim().pipe(z.string().min(1));

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator(PromptSchema)
  .handler(async ({ data }) => {
    mockDb.push({ id: crypto.randomUUID(), role: "user", content: data });

    const { text } = await generateText({
      model: groqProvider("openai/gpt-oss-120b"),
      messages: mockDb,
    });

    mockDb.push({ id: crypto.randomUUID(), role: "assistant", content: text });
  });
