import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const envVars = createEnv({
  server: {
    VERCEL_PROJECT_ID: z.string().min(1),
    VERCEL_OIDC_TOKEN: z.string().min(1),
    VERCEL_TEAM_ID: z.string().min(1),
  },
  runtimeEnv: process.env,
});
