import { boolean, pgTable, text } from "drizzle-orm/pg-core";

import type { UserId } from "@/types";

import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { id } from "@/schema/helpers/id";

export const userTable = pgTable("users", {
  id: id.$type<UserId>(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  ...timestampsWithDelete,
});
