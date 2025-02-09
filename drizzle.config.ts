import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    database: process.env.DB_NAME!,
    host: "bezpestkowe.pl",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }
});