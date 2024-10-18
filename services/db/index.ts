import pg from "pg";
import User from "@app/models/user";
import Util from "../util";

const { Pool } = pg;

const DB = new Pool({
  host: "db",
  port: 5432,
  user: "user123",
  password: "password123",
  database: "db123",
});

let conn_attempt_count = 0;

export async function connectDB() {
  try {
    await Util.sleep(1000);
    await DB.connect();
    const setup = [User].map((table) => table.setup()).join();
    await DB.query(setup);
    const index = [User].map((table) => table.index()).join();
    await DB.query(index);
    console.log("Postgres connected ✅");
  } catch (error) {
    console.log(error);
    if (conn_attempt_count < 1) {
      conn_attempt_count++;
      console.log(
        "Postgres failed to connect... trying again in 5 seconds ⌛️"
      );
      await connectDB();
    } else {
      console.error("Postgres failed to connect ❌");
      process.exit(1);
    }
  }
}

export default DB;
