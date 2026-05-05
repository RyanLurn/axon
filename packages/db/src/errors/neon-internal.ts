import type { NeonDbError } from "@neondatabase/serverless";

import { type BaseContext, BaseError } from "@repo/core/error/classes/base";

export class NeonInternalError extends BaseError<
  "NEON_INTERNAL_ERROR",
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
      name: "NeonInternalError",
      message: message ?? cause.message,
      code: "NEON_INTERNAL_ERROR",
      context,
      cause,
    });
  }
}
