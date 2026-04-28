import { tanstackStartCookies } from "better-auth/tanstack-start";
import { apiKey } from "@better-auth/api-key";
import { betterAuth } from "better-auth";

import { baseOptions } from "@/options/base";

export const auth = betterAuth({
  ...baseOptions,
  // make sure tanstackStartCookies is the last plugin in the array
  plugins: [apiKey(), tanstackStartCookies()],
});
