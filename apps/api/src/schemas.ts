import z from "zod";

export const MessageSchema = z.object({
  id: z.uuidv4(),
  role: z.union([z.literal("user"), z.literal("assistant")]),
  content: z.string(),
});
export type MessageType = z.infer<typeof MessageSchema>;
