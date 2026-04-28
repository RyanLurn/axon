import type { BetterAuthOptions } from "better-auth";

export const userOptions: BetterAuthOptions["user"] = {
  additionalFields: {
    nickname: {
      type: "string",
      required: true,
      input: false,
    },
  },
};
