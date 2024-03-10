import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
  url: process.env["DATABASE_URL"]!,
  authToken: process.env["DATABASE_AUTH_TOKEN"],
});

export const db = drizzle(client, { schema, logger: true });