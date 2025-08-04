import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/utils/db/pool";
import { transactions } from "@/utils/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { Order, Transaction, Verification } from "@ingameltd/node-przelewy24";
import { client } from "@/utils/p24";

const getP24Transaction = async (sessionId: string) => {
  const response = await fetch(`https://sandbox.przelewy24.pl/api/v1/transaction/by/sessionId/${sessionId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${process.env.P24_MERCHANT_ID}:${process.env.P24_API_KEY}`).toString('base64')}`
    }
  })  

  return await response.json() as {data: Verification};
}

const verifyP24Transaction = async (sessionId: string) => {
  const response = await fetch(`https://sandbox.przelewy24.pl/api/v1/transaction/by/sessionId/${sessionId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${process.env.P24_MERCHANT_ID}:${process.env.P24_API_KEY}`).toString('base64')}`
    }
  })  

  return await response.json() as {data: Verification};
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  const {id} = req.query;

  if (!id) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const email = session.user.email;

  const transDB = (await db.select().from(transactions).where(eq(transactions.email, email))).find(t => t.sessionId === id);

  // check if transaction belongs to user
  if (!transDB) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const p24Transaction = await getP24Transaction(transDB.sessionId);

return res.status(200).json({ status: p24Transaction.data.status });

  if (p24Transaction.data.status === 0) {
  }

  const verified = await client.verifyTransaction({
    sessionId: id as string,
    amount: p24Transaction.data.amount,
    currency: p24Transaction.data.currency,
    orderId: p24Transaction.data.orderId
  });

  // TODO: set last status
  // await db.update(transactions)
  //   .set({ status: p24Transaction.data.status })
  //   .where(eq(transactions.sessionId, transDB.sessionId))
  //   .execute();


  return res.status(200).json({ status: p24Transaction.data.status });
}
