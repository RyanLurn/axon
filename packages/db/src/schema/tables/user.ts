import { boolean, pgTable, index, text } from "drizzle-orm/pg-core";
import { generateNickname } from "@repo/randomizer";

import type { UserId } from "@/types";

import { timestampsWithDelete } from "@/schema/helpers/timestamps";
import { id } from "@/schema/helpers/id";

export const userTable = pgTable(
  "users",
  {
    id: id.$type<UserId>(),
    name: text("name"),
    nickname: text("nickname")
      .notNull()
      .$default(() => generateNickname()),
    email: text("email").unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    ...timestampsWithDelete,
  },
  (table) => [index("nickname_idx").on(table.nickname)]
);
