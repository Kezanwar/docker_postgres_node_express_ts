import DB from "@app/services/db";
import Util from "@app/services/util";
import Auth from "@app/services/auth";
import GenericModelMethods from "../generic";

export type TUser = {
  id?: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  auth_method: string;
  otp: string;
  confirmed_email: boolean;
  created_at: string;
};

export type TUserClient = Omit<TUser, "id" | "password" | "otp" | "uuid">;

type CreateNewUser = {
  first_name: string;
  last_name: string;
  email: string;
  auth_method: string;
  password: string;
};

class User {
  id?: number;
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  auth_method: string;
  otp: string;
  confirmed_email: boolean;
  created_at: string;

  constructor(userObject: TUser) {
    this.id = userObject.id;
    this.uuid = userObject.uuid;
    this.auth_method = userObject.auth_method;
    this.first_name = userObject.first_name;
    this.last_name = userObject.last_name;
    this.email = userObject.email;
    this.password = userObject.password;
    this.otp = userObject.otp;
    this.confirmed_email = userObject.confirmed_email;
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
    otp varchar(6),
    confirmed_email bool,
    created_at timestamp
    );
    `;
  }

  static index() {
    `
    CREATE INDEX idx_uuid
    ON ${this.tableName} (uuid);
    `;
  }

  static async create(user: CreateNewUser): Promise<User | undefined> {
    const query = await DB.query<TUser>(
      `INSERT INTO ${this.tableName} (
       uuid, first_name, last_name, email, auth_method, created_at, password, otp, confirmed_email
       ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        Util.makeUUID(),
        user.first_name,
        user.last_name,
        user.email,
        user.auth_method,
        Util.makeUTCNow(),
        user.password,
        Auth.makeOTP(),
        false,
      ]
    );

    if (!query.rows[0]) {
      return undefined;
    } else {
      return new User(query.rows[0]);
    }
  }

  static deleteByUUID(uuid: string) {
    return GenericModelMethods.deleteByUUID(this.tableName, uuid);
  }

  static async getUserByUUID(uuid: string): Promise<User | null> {
    const search = await DB.query(
      `SELECT *
       FROM ${this.tableName}
       WHERE uuid = $1
       `,
      [uuid]
    );

    return search?.rows?.[0] ? new User(search.rows[0]) : null;
  }

  static async canUseEmail(email: string): Promise<boolean> {
    const search = await DB.query(
      `SELECT  uuid, email, created_at
       FROM ${this.tableName}
       WHERE email = $1
       `,
      [email.toLowerCase()]
    );
    return !!search?.rows?.[0];
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const search = await DB.query(
      `SELECT *
       FROM ${this.tableName}
       WHERE email = $1
       `,
      [email]
    );
    return search?.rows?.[0] ? new User(search.rows[0]) : null;
  }

  static async getUsers(where?: string): Promise<TUser[]> {
    const search = await DB.query(
      // `SELECT id, uuid, first_name, last_name, email, created_at
      `SELECT *
       FROM ${this.tableName} 
       ${where || ""}
       `,
      []
    );
    return search?.rows || null;
  }

  // MODEL METHODS

  async save(): Promise<TUser | null> {
    const result = await DB.query<TUser>(
      `UPDATE ${User.tableName}
       SET first_name = $2, last_name = $3, auth_method = $4, email = $5, otp = $6, confirmed_email = $7
       WHERE uuid = $1
       RETURNING *;`,
      [
        this.uuid,
        this.first_name,
        this.last_name,
        this.auth_method,
        this.email.toLowerCase(),
        this.otp,
        this.confirmed_email,
      ]
    );

    return result.rows?.[0] || null;
  }

  toClient(): TUserClient {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      auth_method: this.auth_method,
      confirmed_email: this.confirmed_email,
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
