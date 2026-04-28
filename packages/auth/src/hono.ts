import { apiKey } from "@better-auth/api-key";
import { betterAuth } from "better-auth";

import { baseOptions } from "@/options/base";

export const auth = betterAuth({
  ...baseOptions,
  plugins: [apiKey()],
});
