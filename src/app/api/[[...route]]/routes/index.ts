import { Hono } from "hono";

// ** import rest api
import { chapterApi } from "./chapter";

export const router = new Hono();

// config other rest api routes
router.route("chapter", chapterApi);
