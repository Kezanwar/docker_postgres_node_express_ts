import { CreatePersonPostData, Person } from "@app/types/person";
import { v4 } from "uuid";
import db from ".";

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
    return db.query<Person>(`SELECT * FROM Person`);
  }

  static create(person: CreatePersonPostData) {
    return db.query<Person>(
      `INSERT INTO Person (uuid, name, job, created_at) 
       VALUES ($1, $2, $3, $4 )
       RETURNING *`,
      [v4(), person.name, person.job, new Date(new Date().toISOString())]
    );
  }
}

export default PersonDB;
