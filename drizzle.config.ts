import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    database: "u556212339_topestka",
    host: "bezpestkowe.pl",
    password: "bpn5yvx@jgk5FPC*dbv",
    port: 3306,
    user: "u556212339_topestka_admin",
  }
});