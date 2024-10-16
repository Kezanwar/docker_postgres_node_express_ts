import pg from "pg";
import PersonDB from "./person";

const { Pool } = pg;

const DB = new Pool({
  host: "db",
  port: 5432,
  user: "user123",
  password: "password123",
  database: "db123",
});

export async function connectDB() {
  try {
    await DB.connect();
    const queries = [PersonDB].map((table) => table.setup()).join();
    await DB.query(queries);
    console.log("Postgres connected ✅");
  } catch (error) {
    console.error("Postgres failed to connect ❌");
    process.exit(1);
  }
}

export default DB;
