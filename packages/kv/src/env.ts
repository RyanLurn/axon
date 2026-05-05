import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const kvEnv = createEnv({
  server: {
    UPSTASH_REDIS_REST_URL: z.url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  },
  runtimeEnv: process.env,
});
