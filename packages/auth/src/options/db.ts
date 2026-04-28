import type { BetterAuthOptions } from "better-auth";

import {
  verificationTable,
  accountTable,
  sessionTable,
} from "@repo/db/schema/tables/auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { userTable } from "@repo/db/schema/tables/user";
import { db } from "@repo/db";

export const dbOptions: BetterAuthOptions["database"] = drizzleAdapter(db, {
  provider: "pg",
  schema: {
    verification: verificationTable,
    session: sessionTable,
    account: accountTable,
    user: userTable,
  },
});
