import { NextApiRequest, NextApiResponse } from "next";
import { Country, Currency, Encoding, Language, Order, P24Error } from "@ingameltd/node-przelewy24";
import { nanoid } from "nanoid";
import { db } from "@/utils/db/pool";
import { transactions } from "@/utils/db/schema";
import { client } from "@/utils/p24";
import { AuthenticationError, DatabaseError, withAuth } from "@/utils/api";
import { ResultAsync } from "neverthrow";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { authOptions } from "../../auth/[...nextauth]";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const coursePrice = 5000;

function saveTransactionInDb(sessionId: string, email: string, token: string): ResultAsync<MySqlRawQueryResult, DatabaseError> {
  return ResultAsync.fromPromise(
    db.insert(transactions).values({
    amount: coursePrice,
    sessionId,
    email,
    token,
  }).execute(),
  (error) => new DatabaseError(error as Error)
  )
}

function handleError(error: DatabaseError | AuthenticationError | P24Error, res: NextApiResponse) {
  if (error instanceof AuthenticationError) {
    return res.status(401).json({message: error.message});
  }
  if (error instanceof DatabaseError) {
    return res.status(500).json({message: error.message});
  }
  if (error instanceof P24Error) {
    return res.status(502).json({message: error.message });
  }
  return res.status(500).json({message: "Internal Server Error"});
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const p24 = client;

  // unikalny token transakcji
  const sessionId = nanoid();

  const order = (email: string): Order => ({
    sessionId,
    amount: coursePrice, 
    currency: Currency.PLN,
    description: `Zakup kursu toPestka`,
    email,
    country: Country.Poland,
    language: Language.PL,
    urlReturn: `${baseUrl}/transaction/status/${sessionId}`,
    timeLimit: 15, // 15min
    encoding: Encoding.UTF8,
  });

  const a = res.json({message: "test"})


  return withAuth(req, res, authOptions)
    .andThen(({email}) => {
      return ResultAsync.fromPromise(
        p24.createTransaction(order(email)),
        (error) => new P24Error("Failed to create transaction", 502)
      )
      .andThrough(({token}) => saveTransactionInDb(sessionId, email, token))
    })
    .match(
      ({link}) => {res.status(200).json({link})},
      (error) => handleError(error, res)
    )
  }

