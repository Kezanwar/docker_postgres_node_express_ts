import DB from "@app/services/db";
import { GenericModelMethods } from "../generic";
import Util from "@app/services/util";

export type TUser = {
  id?: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  auth_method: string;
  password?: string;
  created_at: string;
};

export type TUserClient = Omit<TUser, "id" | "password">;

type CreateNewUser = {
  first_name: string;
  last_name: string;
  email: string;
  auth_method: string;
  password?: string;
};

class User {
  id?: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  auth_method: string;
  password?: string;
  created_at: string;

  constructor(userObject: TUser) {
    this.id = userObject.id;
    this.uuid = userObject.uuid;
    this.auth_method = userObject.auth_method;
    this.first_name = userObject.first_name;
    this.last_name = userObject.last_name;
    this.email = userObject.email;
    this.password = userObject.password;
    this.created_at = userObject.created_at;
  }

  static tableName = "Users";

  static setup() {
    return `
    CREATE TABLE IF NOT EXISTS ${this.tableName} (
    id serial primary key,
    uuid varchar(36),
    first_name varchar(50),
    last_name varchar(50),
    email varchar(120),
    auth_method varchar(12),
    password varchar(120),
    created_at timestamp
);
    `;
  }

  static async create(user: CreateNewUser): Promise<User | undefined> {
    const query = await DB.query<TUser>(
      `INSERT INTO ${this.tableName} (
       uuid, first_name, last_name, email, auth_method, created_at
       ) 
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        Util.makeUUID(),
        user.first_name,
        user.last_name,
        user.email,
        user.auth_method,
        Util.makeUTCNow(),
      ]
    );

    if (!query.rows[0]) {
      return undefined;
    } else {
      return new User(query.rows[0]);
    }
  }

  static findByUUID(uuid: string) {
    return GenericModelMethods.findByUUID<TUser>(this.tableName, uuid);
  }
  static findByID(id: number) {
    return GenericModelMethods.findByID<TUser>(this.tableName, id);
  }
  static find(query: string, args: any[]) {
    return GenericModelMethods.find<TUser>(this.tableName, query, args);
  }

  static async getAll(): Promise<TUser[]> {
    const search = await DB.query(
      `SELECT uuid, first_name, last_name, email, created_at
       FROM ${this.tableName} `,
      []
    );
    return search?.rows || null;
  }

  static async findByEmail(email: string): Promise<TUser | null> {
    const search = await this.find(`WHERE email = $1`, [email]);
    return search?.[0] || null;
  }

  async save(): Promise<TUser | null> {
    const result = await DB.query<TUser>(
      `UPDATE ${User.tableName}
       SET first_name = $2, last_name = $3, auth_method = $4, email = $5
       WHERE uuid = $1
       RETURNING *;`,
      [this.uuid, this.first_name, this.last_name, this.auth_method, this.email]
    );

    return result.rows?.[0] || null;
  }

  toClient(): TUserClient {
    return {
      uuid: this.uuid,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      auth_method: this.auth_method,
      created_at: this.created_at,
    };
  }

  async setPassword(): Promise<TUser | null> {
    const result = await DB.query<TUser>(
      `UPDATE ${User.tableName}
       SET password = $2
       WHERE uuid = $1
       RETURNING *;`,
      [this.uuid, this.password]
    );

    return result.rows?.[0] || null;
  }
}

export default User;
