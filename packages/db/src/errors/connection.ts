import type { NeonDbError } from "@neondatabase/serverless";

import { type BaseContext, BaseError } from "@repo/core/error/classes/base";

export class DatabaseConnectionError extends BaseError<
  "DATABASE_CONNECTION_ERROR",
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
      name: "DatabaseConnectionError",
      message: message ?? cause.message,
      code: "DATABASE_CONNECTION_ERROR",
      context,
      cause,
    });
  }
}
