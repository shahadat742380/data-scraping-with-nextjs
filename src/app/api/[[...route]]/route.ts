import { Hono } from "hono";
import { handle } from "hono/vercel";

import { router } from "./routes";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({
    message: "Server is running...🚀",
  });
});

app.route("/", router)

export const GET = handle(app);
export const POST = handle(app);

export default app as never;