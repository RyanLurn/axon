import { eq } from "drizzle-orm";

import type { UserId } from "@/types";

import { userTable } from "@/schema/tables/user";
import { db } from "@/index";

export type SelectedUser = typeof userTable.$inferSelect;

export async function selectUserById({
  userId,
}: {
  userId: string;
}): Promise<SelectedUser | null> {
  const [selectedUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, userId as UserId));

  if (selectedUser === undefined) {
    return null;
  }

  return selectedUser;
}
