import { createGroq } from "@ai-sdk/groq";

import { envVars } from "@/lib/env-vars";

export const groq = createGroq({
  apiKey: envVars.GROQ_API_KEY,
});
