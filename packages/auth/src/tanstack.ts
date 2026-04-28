import { tanstackStartCookies } from "better-auth/tanstack-start";
import { betterAuth } from "better-auth";

import { baseOptions } from "@/options/base";

export const auth = betterAuth({
  ...baseOptions,
  plugins: [tanstackStartCookies()], // make sure tanstackStartCookies is the last plugin in the array
});
