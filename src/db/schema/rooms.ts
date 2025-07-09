import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
  id: uuid().primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export type InsertRoom = typeof rooms.$inferInsert;
export type SelectRoom = typeof rooms.$inferSelect;
