import type { Result } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { NotFoundError } from "@repo/core/error/classes/not-found";
import { NeonDbError } from "@neondatabase/serverless";
import { DrizzleQueryError, eq } from "drizzle-orm";

import type { UserId } from "@/types";

import { DatabaseConnectionError } from "@/errors/connection";
import { NeonInternalError } from "@/errors/neon-internal";
import { userTable } from "@/schema/tables/user";
import { db } from "@/index";

export type SelectedUser = typeof userTable.$inferSelect;

export async function selectUserById({
  userId,
}: {
  userId: UserId;
}): Promise<
  Result<
    SelectedUser,
    | DatabaseConnectionError
    | NotFoundError<"user">
    | NeonInternalError
    | FallBackError
  >
> {
  const context = {
    operation: "selectUserById",
    arguments: {
      userId,
    },
  };

  try {
    const [selectedUser] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (!selectedUser || selectedUser.deletedAt !== null) {
      return {
        success: false,
        error: new NotFoundError({ context: { ...context, resource: "user" } }),
      };
    }

    return {
      success: true,
      data: selectedUser,
    };
  } catch (error) {
    if (
      error instanceof DrizzleQueryError &&
      error.cause instanceof NeonDbError
    ) {
      const dbError = error.cause;

      if (dbError.sourceError) {
        return {
          success: false,
          error: new DatabaseConnectionError({ context, cause: dbError }),
        };
      }

      if (dbError.code === undefined) {
        return {
          success: false,
          error: new NeonInternalError({ context, cause: dbError }),
        };
      }
    }

    return {
      success: false,
      error: createFallbackError({
        message: "Failed to find user due to an unexpected error",
        context,
        cause: error,
      }),
    };
  }
}
