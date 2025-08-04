import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/db/pool";
import { users } from "@/utils/db/schema";
import { eq } from "drizzle-orm";

// PUT /api/revoke
export default async function PUT(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    if (process.env.NODE_ENV !== "development") {
        return res.status(403).json({ error: "Forbidden" });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    await db.update(users).set({ hasAccess: false }).where(eq(users.email, email));

    return res.status(200).json({ message: "Access revoked" });
}