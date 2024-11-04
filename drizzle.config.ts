import { type Config } from "drizzle-kit";

import { env } from "./src/config/env";
import { databasePrefix } from "./src/lib/constants";

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: [`${databasePrefix}_*`],
  verbose: true,
  strict: true,
} satisfies Config;
