import { drizzle } from "drizzle-orm/neon-http";
import { createEnv } from "@t3-oss/env-core";
import z from "zod";

import {
  verificationTable,
  sessionTable,
  accountTable,
} from "@/schema/tables/auth";
import { apiKeyTable } from "@/schema/tables/api-key";
import { userTable } from "@/schema/tables/user";

const env = createEnv({
  server: {
    NEON_POOLED_CONNECTION_STRING: z.url(),
  },
  runtimeEnv: process.env,
});

export const db = drizzle(env.NEON_POOLED_CONNECTION_STRING, {
  schema: {
    userTable,
    sessionTable,
    accountTable,
    verificationTable,
    apiKeyTable,
  },
});
