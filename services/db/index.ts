import pg from "pg";
import PersonDB from "./person";

const { Pool } = pg;

const db = new Pool({
  host: "db",
  port: 5432,
  user: "user123",
  password: "password123",
  database: "db123",
});

export async function connectDB() {
  try {
    await db.connect();
    const queries = [PersonDB].map((table) => table.setup()).join();
    await db.query(queries);
    console.log("Postgres connected ✅");
  } catch (error) {
    console.error("Postgres failed to connect ❌");
    process.exit(1);
  }
}

export default db;
