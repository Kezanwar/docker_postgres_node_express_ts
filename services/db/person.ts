import { CreatePersonPostData, Person } from "@app/types/person";
import DB from ".";
import DBUtil from "./util";

class PersonDB {
  static setup() {
    return `CREATE TABLE if not exists Person (
    id serial primary key,
    uuid varchar(36),
	name varchar(50),
    job varchar(50),
	created_at timestamp
);`;
  }

  static getAll() {
    return DB.query<Person>(`SELECT * FROM Person`);
  }

  static create(person: CreatePersonPostData) {
    return DB.query<Person>(
      `INSERT INTO Person (uuid, name, job, created_at) 
       VALUES ($1, $2, $3, $4 )
       RETURNING *`,
      [DBUtil.makeUUID(), person.name, person.job, DBUtil.makeUTCNow()]
    );
  }
}

export default PersonDB;