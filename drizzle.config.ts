import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config();

export default defineConfig({
  dialect: "mysql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  }
});