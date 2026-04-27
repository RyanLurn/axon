import { timestamp, pgTable, index, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/schema/helpers/timestamps";
import { userId } from "@/schema/helpers/user-id";
import { id } from "@/schema/helpers/id";

export const sessionTable = pgTable(
  "sessions",
  {
    id,
    userId,
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at", {
      mode: "date",
      withTimezone: true,
      precision: 6,
    }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    ...timestamps,
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)]
);
