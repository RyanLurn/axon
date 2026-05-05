import type { FallBackError } from "@repo/core/error/create-fallback";
import type { Result } from "@repo/core/types/result";

import { NotFoundError } from "@repo/core/error/classes/not-found";
import { eq } from "drizzle-orm";

import type { UserId } from "@/types";

import {
  type DatabaseError,
  handleQueryError,
} from "@/utils/handle-query-error";
import { userTable } from "@/schema/tables/user";
import { db } from "@/index";

export type SelectedUser = typeof userTable.$inferSelect;

export async function selectUserById({
  userId,
}: {
  userId: UserId;
}): Promise<
  Result<SelectedUser, NotFoundError<"user"> | FallBackError | DatabaseError>
> {
  try {
    const [selectedUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (!selectedUser || selectedUser.deletedAt !== null) {
      return {
        success: false,
        error: new NotFoundError({ context: { resource: "user" } }),
      };
    }

    return {
      success: true,
      data: selectedUser,
    };
  } catch (error) {
    return handleQueryError({ error, context: {} });
  }
}
