import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const serverEnv = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.base64(),
    BETTER_AUTH_URL: z.url(),
  },
  runtimeEnv: process.env,
});
