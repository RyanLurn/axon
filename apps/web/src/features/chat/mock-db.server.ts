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
    content:
      "I'm Axon, an AI agent. I can help you with research, writing, coding, analysis, and more. What's on your mind?",
  },
  {
    id: crypto.randomUUID(),
    role: "user",
    content: "Can you help me understand how large language models work?",
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Sure! At a high level, large language models are trained on massive amounts of text data. They learn to predict the next token in a sequence, which — done at scale — results in a model that can reason, summarize, translate, and generate coherent text. The 'large' part refers to the number of parameters, which can be in the billions.",
  },
  {
    id: crypto.randomUUID(),
    role: "user",
    content: "What's a parameter exactly?",
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "A parameter is a numeric weight inside the neural network. During training, these weights are adjusted to minimize prediction error. By the end of training, the values of those weights encode everything the model has 'learned' — grammar, facts, reasoning patterns, and so on.",
  },
  {
    id: crypto.randomUUID(),
    role: "user",
    content: "Is that similar to how the human brain works?",
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Loosely, yes — it was inspired by neuroscience. Artificial neurons pass signals to each other, similar to how biological neurons fire. But the analogy breaks down pretty quickly. Biological brains are far more energy-efficient, operate differently at the hardware level, and we still don't fully understand them. LLMs are a useful tool, not a brain simulation.",
  },
  {
    id: crypto.randomUUID(),
    role: "user",
    content: "Fair enough. Can you write code too?",
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Yes, that's one of my strengths. I can write, explain, debug, and refactor code across most popular languages — TypeScript, Python, Rust, Go, SQL, you name it. What are you working on?",
  },
  {
    id: crypto.randomUUID(),
    role: "user",
    content: "I'm building a chat app in TypeScript with TanStack Start.",
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Nice choice. TanStack Start gives you server functions and SSR out of the box, which pairs really well with a chat app's read/write pattern. Are you using a database, or starting with mock data for now?",
  },
  {
    id: crypto.randomUUID(),
    role: "user",
    content: "Mock data for now. I'll wire up a real DB later.",
  },
  {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "That's a solid approach — get the UI and data flow right first, then swap in the real persistence layer. When you're ready, something like Drizzle with a SQLite or Postgres backend is a natural fit for a Start project.",
  },
];
