import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Country, Currency, Encoding, Language, Order, P24 } from "@ingameltd/node-przelewy24";
import { nanoid } from "nanoid";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const merchantId = process.env.P24_MERCHANT_ID!;
const posId = process.env.P24_POS_ID!;
const apiKey = process.env.P24_API_KEY!;
const crcKey = process.env.P24_CRC_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  // todo: move to env
  // todo: pass session from client
  const session = await getServerSession(req, res, authOptions);

  // TODO: if no session, redirect to login
  if (!session?.user?.email) {
    return res.status(401).json({message: "Unauthorized"});
  }

  const p24 = new P24(Number(merchantId), Number(posId), apiKey, crcKey, { sandbox: true });

  const order: Order = {
    sessionId: nanoid(),
    amount: 1000, // Transaction amount expressed in lowest currency unit, e.g. 1.23 PLN = 123
    currency: Currency.PLN,
    description: "test order",
    email: session?.user?.email,
    country: Country.Poland,
    language: Language.PL,
    urlReturn: `${baseUrl}/transaction-success`,
    timeLimit: 15, // 15min
    encoding: Encoding.UTF8,
  }

  const {link} = await p24.createTransaction(order)

  return res.status(200).json({
    link,
  });

}   