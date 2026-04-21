import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const envVars = createEnv({
  server: {
    GROQ_API_KEY: z.string().min(1),
    VERCEL_PROJECT_ID: z.string().min(1),
    VERCEL_OIDC_TOKEN: z.string().min(1),
    VERCEL_TEAM_ID: z.string().min(1),
  },
  runtimeEnv: process.env,
});
