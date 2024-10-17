import DB from "@app/services/db";
import { GenericModelMethods } from "../generic";

type TUser = {
  id?: number;
  uuid: string;
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

  constructor(userObject: TUser) {
    this.id = userObject.id;
    this.uuid = userObject.uuid;
    this.auth_method = userObject.auth_method;
    this.first_name = userObject.first_name;
    this.last_name = userObject.last_name;
    this.email = userObject.email;
    this.password = userObject.password;
  }

  static findByUUID(uuid: string) {
    return GenericModelMethods.findByUUID(uuid, "User");
  }
  static findByID(id: number) {
    return GenericModelMethods.findByID(id, "User");
  }
  static find(query: string, args: any[]) {
    return GenericModelMethods.find(query, args, "User");
  }

  static async findByEmail(email: string) {
    const search = await this.find(`WHERE email = $1`, [email]);
    return search?.[0] || null;
  }
  // static findByID = BaseUser.findByID;
  // static find = BaseUser.find;

  static setup() {
    return `
    CREATE TABLE if not exists User (
    id serial primary key,
    uuid varchar(36),
	  first_name varchar(50),
    last_name varchar(50),
    email varchar(120),
    password varchar(120),
	  created_at timestamp );
    `;
  }

  async save() {
    const result = await DB.query<TUser>(
      `UPDATE Users
       SET first_name = $2, last_name = $3, auth_method = $4, email = $5
       WHERE uuid = $1
       RETURNING *;`,
      [this.uuid, this.first_name, this.last_name, this.auth_method, this.email]
    );
  }

  async setPassword() {
    const result = await DB.query<TUser>(
      `UPDATE Users
       SET password = $2
       WHERE uuid = $1
       RETURNING *;`,
      [this.uuid, this.password]
    );
  }
}

export default User;
