import type { NeonDbError } from "@neondatabase/serverless";

import { type BaseContext, BaseError } from "@repo/core/error/classes/base";

export class DatabaseQueryError extends BaseError<
  "DATABASE_QUERY_ERROR",
  BaseContext,
  NeonDbError
> {
  constructor({
    message,
    context,
    cause,
  }: {
    message?: string;
    context: BaseContext;
    cause: NeonDbError;
  }) {
    super({
      name: "DatabaseQueryError",
      message: message ?? cause.message,
      code: "DATABASE_QUERY_ERROR",
      context,
      cause,
    });
  }
}
