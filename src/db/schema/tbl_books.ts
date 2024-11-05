import { pgTable } from "@/db/utils";
import { relations } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";

// import tables
import { sub_books } from "./tbl_sub_books";
import { chapters } from "./tbl_chapters";

export const books = pgTable("books", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),
  title: text("title"),
  cover_image: text("cover_image"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;

// ** __________ Books RELATIONS __________ ** //

export const Books = relations(books, ({ many }) => ({
  sub_books: many(sub_books),
  chapter: many(chapters),
}));
