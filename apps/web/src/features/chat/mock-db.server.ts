import "@tanstack/react-start/server-only";

export type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export const mockDb: Message[] = [
  {
    id: crypto.randomUUID(),
    role: "user",
    content: "Hi there. Who are you?",
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content: "I'm Axon, an AI agent.",
  },
  {
    id: crypto.randomUUID(),
    role: "user",
    content: "Cool!",
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content: "Thanks!",
  },
];
