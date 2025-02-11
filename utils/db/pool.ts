import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

export const pool = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0
});

pool.on('connection', (connection) => {
    console.log(`Connection ${connection.threadId} connected`);
});

pool.on('release', (con) => {
    console.log(`Connection ${con.threadId} released`);
});

export const db = await drizzle(pool);
