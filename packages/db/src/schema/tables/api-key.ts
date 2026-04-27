import {
  timestamp,
  boolean,
  integer,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { timestampConfig, timestamps } from "@/schema/helpers/timestamps";
import { id } from "@/schema/helpers/id";

export const apiKeyTable = pgTable("api_keys", {
  id,
  configId: text("config_id").notNull(),
  name: text("name"),
  start: text("start"),
  prefix: text("prefix"),
  key: text("key").notNull(),
  referenceId: text("reference_id").notNull(),
  refillInterval: integer("refill_interval"),
  refillAmount: integer("refill_amount"),
  lastRefillAt: timestamp("last_refill_at", timestampConfig),
  enabled: boolean("enabled"),
  rateLimitEnabled: boolean("rate_limit_enabled"),
  rateLimitTimeWindow: integer("rate_limit_time_window"),
  rateLimitMax: integer("rate_limit_max"),
  requestCount: integer("request_count"),
  remaining: integer("remaining"),
  lastRequest: timestamp("last_request", timestampConfig),
  expiresAt: timestamp("expires_at", timestampConfig),
  permissions: text("permissions"),
  metadata: text("metadata"),
  ...timestamps,
});
