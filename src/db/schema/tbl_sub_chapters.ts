import { relations, sql } from "drizzle-orm";
import { pgTable } from "@/db/utils";
import { text, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";

// import table
import { chapters } from "./tbl_chapters";
import { purports } from "./tbl_purports";

export const sub_chapters = pgTable("sub_chapters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),
  chapter_id: varchar("chapter_id")
    .notNull()
    .references(() => chapters.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  url: text("url"),
  content: json("content"),
  devanagari: text("devanagari"),
  verse: text("verse"),
  synonyms: text("synonyms"),
  translation: text("translation"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type SubChapter = typeof sub_chapters.$inferSelect;
export type NewSubChapter = typeof sub_chapters.$inferInsert;

// ** __________ Sub Chapter RELATIONS __________ ** //

export const sub_chapter_relations = relations(sub_chapters, ({ one, many }) => ({
  chapters: one(chapters, {
    fields: [sub_chapters.chapter_id],
    references: [chapters.id],
  }),
  purports: many(purports)
}));
