import type { BetterAuthOptions } from "better-auth";

import { serverEnv } from "@/env/server";

export const baseOptions: BetterAuthOptions = {
  secret: serverEnv.BETTER_AUTH_SECRET,
  baseURL: serverEnv.BETTER_AUTH_URL,
  advanced: {
    database: {
      generateId: false,
    },
  },
};
