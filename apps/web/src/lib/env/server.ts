import "@tanstack/react-start/server-only";
import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const serverEnv = createEnv({
  server: {
    GROQ_API_KEY: z.string().min(1),
  },
  runtimeEnv: process.env,
});
