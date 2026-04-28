import type { BetterAuthOptions } from "better-auth";

import {
  verificationTable,
  accountTable,
  sessionTable,
} from "@repo/db/schema/tables/auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { userTable } from "@repo/db/schema/tables/user";
import { db } from "@repo/db";

import { serverEnv } from "@/env/server";

export const baseOptions = {
  secret: serverEnv.BETTER_AUTH_SECRET,
  baseURL: serverEnv.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      verification: verificationTable,
      session: sessionTable,
      account: accountTable,
      user: userTable,
    },
  }),
  user: {
    additionalFields: {
      nickname: {
        type: "string",
        required: true,
        input: false,
      },
      deletedAt: {
        fieldName: "deleted_at",
        type: "date",
        required: false,
        input: false,
      },
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
} satisfies BetterAuthOptions;
