import { eq } from "drizzle-orm";

import type { UserId } from "@/types";

import { userTable } from "@/schema/tables/user";
import { db } from "@/index";

export async function selectUserById({ userId }: { userId: string }) {
  const [selectedUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, userId as UserId));

  if (selectedUser === undefined) {
    return null;
  }

  return selectedUser;
}
