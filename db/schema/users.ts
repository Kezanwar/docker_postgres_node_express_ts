import { boolean, index, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import timestamps from "../helpers/timestamps";
import Util from "@app/services/util";
import Auth from "@app/services/auth";

const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uuid: varchar({ length: 36 })
      .notNull()
      .unique()
      .$default(() => Util.makeUUID()),
    first_name: varchar({ length: 255 }).notNull(),
    last_name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    auth_method: varchar({ enum: Auth.auth_methods_enum }).notNull(),
    otp: varchar({ length: 6 })
      .notNull()
      .$default(() => Auth.makeOTP()),
    confirmed_email: boolean().$default(() => false),
    ...timestamps,
  },
  (table) => {
    return {
      uuidIdx: index("uuid_idx").on(table.uuid),
    };
  }
);

export default usersTable;

export type SelectUser = typeof usersTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
