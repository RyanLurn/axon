import { createServerFn } from "@tanstack/react-start";

import { mockDb } from "@/features/chat/mock-db.server";

export const listMessages = createServerFn().handler(() => mockDb);
