import type { BaseContext } from "@repo/core/error/classes/base";
import type { Failure } from "@repo/core/types/result";

import {
  createFallbackError,
  type FallBackError,
} from "@repo/core/error/create-fallback";
import { NeonDbError } from "@neondatabase/serverless";
import { DrizzleQueryError } from "drizzle-orm";

import { DatabaseConnectionError } from "@/errors/connection";
import { NeonInternalError } from "@/errors/neon-internal";
import { DatabaseQueryError } from "@/errors/query";

export type DatabaseError =
  | DatabaseConnectionError
  | DatabaseQueryError
  | NeonInternalError;

export function handleQueryError({
  error,
  context,
}: {
  error: unknown;
  context: BaseContext;
}): Failure<DatabaseError | FallBackError> {
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

    if (dbError.code) {
      return {
        success: false,
        error: new DatabaseQueryError({ context, cause: dbError }),
      };
    }

    return {
      success: false,
      error: new NeonInternalError({ context, cause: dbError }),
    };
  }

  const fallbackError = createFallbackError({ context, cause: error });
  return {
    success: false,
    error: fallbackError,
  };
}
