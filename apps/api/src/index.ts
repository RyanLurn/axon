import { Hono } from "hono";

import { mockDb } from "@/mock-db";

export const app = new Hono()
  .get("/", (c) => c.text("OK"))
  .get("/messages", (c) => c.json({ data: mockDb.messages }))
  .get("/messages/:id", (c) => {
    const id = c.req.param("id");
    const foundMessage = mockDb.messages.find((message) => message.id === id);

    if (foundMessage === undefined) {
      return c.json({ error: "Message not found" }, 404);
    }
    return c.json({ data: foundMessage });
  });
