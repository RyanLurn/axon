import { Redis } from "@upstash/redis";

import { kvEnv } from "@/env";

export const kv = new Redis({
  url: kvEnv.UPSTASH_REDIS_REST_URL,
  token: kvEnv.UPSTASH_REDIS_REST_TOKEN,
});
