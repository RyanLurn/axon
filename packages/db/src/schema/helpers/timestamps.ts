import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
    precision: 6,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
    precision: 6,
  })
    .defaultNow()
    .notNull()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
};

export const timestampsWithDelete = {
  ...timestamps,
  deletedAt: timestamp("deleted_at", {
    mode: "date",
    withTimezone: true,
    precision: 6,
  }).defaultNow(),
};
