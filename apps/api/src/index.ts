import { validator } from "hono/validator";
import { prettifyError } from "zod";
import { Hono } from "hono";

import { MessageSchema, type Message } from "@/schemas";
import { mockDb } from "@/mock-db";

export const app = new Hono()
  .get("/", (c) => c.text("OK"))
  .get("/messages", (c) => c.json({ data: mockDb.messages }))
  .get(
    "/messages/:id",
    validator("param", (value, c) => {
      const parseResult = MessageSchema.shape.id.safeParse(value.id);
      if (parseResult.success === false) {
        return c.json(
          {
            error: {
              code: "VALIDATION_ERROR",
              message: prettifyError(parseResult.error),
            },
          },
          400
        );
      }
      return parseResult.data;
    }),
    (c) => {
      const id = c.req.valid("param");
      const foundMessage = mockDb.messages.find((message) => message.id === id);
      if (foundMessage === undefined) {
        return c.json(
          {
            error: { code: "NOT_FOUND_ERROR", message: "Message not found" },
          },
          404
        );
      }
      return c.json({ data: foundMessage });
    }
  )
  .post(
    "/messages",
    validator("json", (value, c) => {
      const parseResult = MessageSchema.omit({ id: true }).safeParse(value);
      if (parseResult.success === false) {
        return c.json({
          error: {
            code: "VALIDATION_ERROR",
            message: prettifyError(parseResult.error),
          },
        });
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
