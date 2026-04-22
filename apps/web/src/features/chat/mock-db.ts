import "@tanstack/react-start/server-only";
import type { UIMessage } from "ai";

export const mockDb: UIMessage[] = [
  {
    id: crypto.randomUUID(),
    role: "user",
    parts: [{ type: "text", text: "Hi there. Who are you?" }],
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    parts: [{ type: "text", text: "I'm Axon, an AI agent.", state: "done" }],
  },
  {
    id: crypto.randomUUID(),
    role: "user",
    parts: [{ type: "text", text: "Cool!" }],
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    parts: [{ type: "text", text: "Thanks!", state: "done" }],
  },
];
