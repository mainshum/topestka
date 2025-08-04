import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { Country, Currency, Encoding, Language, Order, P24 } from "@ingameltd/node-przelewy24";
import { nanoid } from "nanoid";
import { db } from "@/utils/db/pool";
import { transactions } from "@/utils/db/schema";
import { client } from "@/utils/p24";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const coursePrice = 5000;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // todo: move to env
  // todo: pass session from client
  const session = await getServerSession(req, res, authOptions);

  // TODO: if no session, redirect to login
  if (!session?.user?.email) {
    return res.status(401).json({message: "Unauthorized"});
  }

  const email = session.user.email;

  const p24 = client;

  // unikalny token transakcji
  const sessionId = nanoid();

  const order: Order = {
    sessionId,
    amount: coursePrice, 
    currency: Currency.PLN,
    description: Math.random().toString(36).substring(2, 15),
    email,
    country: Country.Poland,
    language: Language.PL,
    urlReturn: `${baseUrl}/transaction/status/${sessionId}`,
    timeLimit: 15, // 15min
    encoding: Encoding.UTF8,
  }

  const {link, token} = await p24.createTransaction(order)

  await db.insert(transactions).values({
    amount: coursePrice,
    sessionId,
    email,
    token,
  }).execute();

  return res.status(200).json({
    link,
  });

}   