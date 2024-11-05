CREATE TABLE IF NOT EXISTS "tbl_books" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"cover_image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_chapters" (
	"id" text PRIMARY KEY NOT NULL,
	"book_id" varchar NOT NULL,
	"sub_book_id" varchar NOT NULL,
	"content" json,
	"title" text,
	"cover_img" text,
	"order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_sub_chapters" (
	"id" text PRIMARY KEY NOT NULL,
	"chapter_id" varchar NOT NULL,
	"url" text,
	"content" json,
	"devanagari" text,
	"verse" text,
	"synonyms" text,
	"translation" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_sub_books" (
	"id" text PRIMARY KEY NOT NULL,
	"book_id" varchar NOT NULL,
	"title" text,
	"cover_image" text,
	"order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tbl_purports" (
	"id" text PRIMARY KEY NOT NULL,
	"sub_chapter_id" varchar NOT NULL,
	"content" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_chapters" ADD CONSTRAINT "tbl_chapters_book_id_tbl_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."tbl_books"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_chapters" ADD CONSTRAINT "tbl_chapters_sub_book_id_tbl_sub_books_id_fk" FOREIGN KEY ("sub_book_id") REFERENCES "public"."tbl_sub_books"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_sub_chapters" ADD CONSTRAINT "tbl_sub_chapters_chapter_id_tbl_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."tbl_chapters"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_sub_books" ADD CONSTRAINT "tbl_sub_books_book_id_tbl_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."tbl_books"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tbl_purports" ADD CONSTRAINT "tbl_purports_sub_chapter_id_tbl_sub_chapters_id_fk" FOREIGN KEY ("sub_chapter_id") REFERENCES "public"."tbl_sub_chapters"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
