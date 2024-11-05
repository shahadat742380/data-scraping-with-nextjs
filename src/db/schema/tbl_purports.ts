import { pgTable } from "@/db/utils";
import { text, timestamp, varchar, integer, json } from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";

// import table
import { sub_chapters } from "./tbl_sub_chapters";
import { relations } from "drizzle-orm";

export const purports = pgTable("purports", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),
  sub_chapter_id: varchar("sub_chapter_id")
    .notNull()
    .references(() => sub_chapters.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  content: json("content"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Purports = typeof purports.$inferSelect;
export type NewPurports = typeof purports.$inferInsert;

// ** __________ Purports RELATIONS __________ ** //

export const purports_relations = relations(purports, ({ one }) => ({
  sub_chapters: one(sub_chapters, {
    fields: [purports.sub_chapter_id],
    references: [sub_chapters.id],
  }),
}));
