import { env } from "@/config/env";

// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from '@neondatabase/serverless';

import * as schema from "./schema";

// const client = postgres(env.DATABASE_URL);
const client = new Pool({ connectionString: env.DATABASE_URL, });

export const db = drizzle(client, { schema, logger: true });