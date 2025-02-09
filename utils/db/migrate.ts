import "dotenv/config"
import { migrate } from "drizzle-orm/mysql2/migrator"
import { db, connection } from "./schema"
 
// This will run migrations on the database, skipping the ones already applied
(async () => {
    await migrate(await db(), { migrationsFolder: "./drizzle" })

    const con = await connection()
    
    // Don't forget to close the connection, otherwise the script will hang
    await con.end()
})()