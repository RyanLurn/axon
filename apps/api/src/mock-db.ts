import type { Message } from "@/schemas";

interface MockDb {
  messages: Message[];
}

export const mockDb: MockDb = {
  messages: [],
};
