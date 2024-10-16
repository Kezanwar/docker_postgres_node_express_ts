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
}

export default DB;
