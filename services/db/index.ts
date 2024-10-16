import { CreatePersonPostData } from "@app/types/person";
import pg from "pg";

const { Pool } = pg;

const db = new Pool({
  host: "db",
  port: 5432,
  user: "user123",
  password: "password123",
  database: "db123",
});

class DB {
  static connect() {
    return db.connect();
  }

  static setup() {
    return db.query(`CREATE TABLE if not exists Person (
    ID serial primary key,
	Name varchar(50),
    Job varchar(50),
	CreatedAt timestamp
)`);
  }

  static createPerson(person: CreatePersonPostData) {
    return db.query(`INSERT INTO Person (name, job) VALUES ($1, $2)`, [
      person.name,
      person.job,
    ]);
  }
}

export default DB;
