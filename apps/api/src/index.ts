import { Hono } from "hono";

import { mockDb } from "@/mock-db";

export const app = new Hono()
  .get("/", (c) => c.text("OK"))
  .get("/messages", (c) => {
    return c.json({ data: mockDb.messages });
  });
