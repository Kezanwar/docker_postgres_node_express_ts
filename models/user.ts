import { eq } from "drizzle-orm";
import db from "@app/db";
import usersTable, { SelectUser, InsertUser } from "@app/db/schemas/users";
import Util from "@app/services/util";

export type TUserClient = Omit<SelectUser, "id" | "password" | "otp" | "uuid">;

class User {
  data: SelectUser;

  constructor(user: SelectUser) {
    this.data = user;
  }

  static async create(u: InsertUser) {
    const createUser = await db.insert(usersTable).values(u).returning();
    return new User(createUser[0]);
  }

  static async getUserByUUID(uuid: string): Promise<User | null> {
    const u = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.uuid, uuid));
    return u?.[0] ? new User(u[0]) : null;
  }

  static deleteByUUID(uuid: string) {
    return db.delete(usersTable).where(eq(usersTable.uuid, uuid));
  }

  static async canUseEmail(email: string): Promise<boolean> {
    const u = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return !!u[0];
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const u = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return u?.[0] ? new User(u[0]) : null;
  }

  static async getUsers(): Promise<SelectUser[]> {
    const u = await db.select().from(usersTable);
    return u;
  }

  async save() {
    await db
      .update(usersTable)
      .set({
        first_name: this.data.first_name,
        last_name: this.data.last_name,
        email: this.data.email,
        otp: this.data.otp,
        password: this.data.password,
        auth_method: this.data.auth_method,
        confirmed_email: this.data.confirmed_email,
        deleted_at: this.data.deleted_at,
        updated_at: Util.makeUTCNow(),
      })
      .where(eq(usersTable.uuid, this.data.uuid));
  }

  toClient(): TUserClient {
    return {
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      email: this.data.email,
      auth_method: this.data.auth_method,
      confirmed_email: this.data.confirmed_email,
      created_at: this.data.created_at,
      deleted_at: this.data.deleted_at,
      updated_at: this.data.updated_at,
    };
  }
}

export default User;
