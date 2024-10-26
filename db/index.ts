import { drizzle } from "drizzle-orm/node-postgres";
import usersTable from "./schemas/users";

const db = drizzle(process.env.DATABASE_URL!);

export default db;

export async function validateConntection() {
  try {
    // Simple query to verify the connection
    await db.select({}).from(usersTable).limit(1);
    console.log("Drizzle is connected to PostgreSQL 🚀");
  } catch (error) {
    console.error("Failed to connect to PostgreSQL:", error);
    process.exit(1);
  }
}
