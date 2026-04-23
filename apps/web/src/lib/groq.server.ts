import "@tanstack/react-start/server-only";
import { createGroq } from "@ai-sdk/groq";

import { serverEnv } from "@/lib/env/server";

export const groqProvider = createGroq({
  apiKey: serverEnv.GROQ_API_KEY,
});
