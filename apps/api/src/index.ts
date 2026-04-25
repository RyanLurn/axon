import { validator } from "hono/validator";
import { Hono } from "hono";

import { MessageSchema, type Message } from "@/schemas";
import { mockDb } from "@/mock-db";

export const app = new Hono()
  .get("/", (c) => c.text("OK"))
  .get("/messages", (c) => c.json({ data: mockDb.messages }))
  .get("/messages/:id", (c) => {
    // Parse the id path param
    const id = c.req.param("id");
    const parseIdResult = MessageSchema.shape.id.safeParse(id);
    if (parseIdResult.success === false) {
      return c.json({ error: "Invalid message id" }, 400);
    }

    // Find the requested message
    const foundMessage = mockDb.messages.find(
      (message) => message.id === parseIdResult.data
    );
    if (foundMessage === undefined) {
      return c.json({ error: "Message not found" }, 404);
    }
    return c.json({ data: foundMessage });
  })
  .post(
    "/messages",
    validator("json", (value, c) => {
      const parseResult = MessageSchema.omit({ id: true }).safeParse(value);
      if (parseResult.success === false) {
        return c.json({ error: "Invalid message" });
      }
      return parseResult.data;
    }),
    (c) => {
      const { role, content } = c.req.valid("json");
      const newMessage: Message = {
        id: crypto.randomUUID(),
        role,
        content,
      };

      mockDb.messages.push(newMessage);

      return c.json({ data: newMessage }, 201);
    }
  );
