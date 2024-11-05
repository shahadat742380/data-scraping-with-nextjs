import { pgTable } from "@/db/utils";
import { integer, json, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";
import { relations } from "drizzle-orm";

// import table
import { books } from "./tbl_books";
import { sub_books } from "./tbl_sub_books";
import { sub_chapters } from "./tbl_sub_chapters";

export const chapters = pgTable("chapters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),
  book_id: varchar("book_id")
    .notNull()
    .references(() => books.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  sub_book_id: varchar("sub_book_id").references(() => sub_books.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  content: json("content"),
  title: text("title"),
  url: text("cover_img"),
  order: integer("order"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Chapter = typeof chapters.$inferSelect;
export type NewChapter = typeof chapters.$inferInsert;

// ** __________ Chapters RELATIONS __________ ** //

export const chapter_relations = relations(chapters, ({ one, many }) => ({
  books: one(books, {
    fields: [chapters.book_id],
    references: [books.id],
  }),
  sub_books: one(sub_books, {
    fields: [chapters.sub_book_id],
    references: [sub_books.id],
  }),
  sub_chapter: many(sub_chapters),
}));
