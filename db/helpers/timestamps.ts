import { timestamp } from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp({ mode: "string" }),
  created_at: timestamp({ mode: "string" }).defaultNow().notNull(),
  deleted_at: timestamp({ mode: "string" }),
};

export default timestamps;
