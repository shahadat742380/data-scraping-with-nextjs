import { pgTable } from "@/db/utils";
import { relations } from "drizzle-orm";
import { text, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";

// import table
import { books } from "./tbl_books";
import { chapters } from "./tbl_chapters";

export const sub_books = pgTable("sub_books", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),
  book_id: varchar("book_id")
    .notNull()
    .references(() => books.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  title: text("title"),
  cover_image: text("cover_image"),
  order: integer("order"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type SubBook = typeof sub_books.$inferSelect;
export type NewSubBook = typeof sub_books.$inferInsert;

// ** __________ Sub Books RELATIONS __________ ** //

export const sub_book_relations = relations(
    sub_books,
    ({ one, many }) => ({
      sub_book: one(books, {
        fields: [sub_books.book_id],
        references: [books.id],
      }),
      chapters: many(chapters),
    }),
  );
  
