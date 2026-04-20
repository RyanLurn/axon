import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const envVars = createEnv({
  server: {
    VERCEL_OIDC_TOKEN: z.string().min(1),
  },
  runtimeEnv: process.env,
});
