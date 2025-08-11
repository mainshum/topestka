import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/utils/db/pool";
import { transactions } from "@/utils/db/schema";
import { eq } from "drizzle-orm";
import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { AuthenticationError, DatabaseError, withAuth } from "@/utils/api";
import { client } from "@/utils/p24";
import { TransactionStatus } from "@/utils/types";

class TransactionNotFoundError extends Error {
  constructor(originalError: Error) {
    super(originalError.message);
    this.name = "TransactionNotFoundError";
  }
}

class P24ApiError extends Error {
  constructor(originalError: Error) {
    super(originalError);
    this.name = "P24ApiError";
  }
}

type P24TransactionStatus = {
  0: 'no-payment',
  1: 'advance payment',
  2: 'payment made',
  3: 'payment returned',
}

function verifyTransaction(sessionId: string, amount: number, currency: string, orderId: number): ResultAsync<'success' | 'failed' | 'already-verified', Error> {
  return ResultAsync.fromPromise(
    client.verifyTransaction({
      sessionId,
      amount,
      currency,
      orderId,
    }),
    (error) => new P24ApiError(error as Error)
  )
  .map((isVerified) => isVerified ? 'success' : 'failed');
}
  

export type P24TransactionById = {
  statement: string,
  orderId: number,
  sessionId: string,
  status: keyof P24TransactionStatus,
  amount: number,
  currency: string,
}


const getP24Transaction = (sessionId: string): ResultAsync<P24TransactionById, Error> => {
  const responsePromise = fetch(
    `https://sandbox.przelewy24.pl/api/v1/transaction/by/sessionId/${sessionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.P24_MERCHANT_ID}:${process.env.P24_API_KEY}`
        ).toString("base64")}`,
      },
    }
  );

  return (
    ResultAsync.fromPromise(
      responsePromise,
      (error) => new P24ApiError(error as Error)
    )
      .andThen((response) => {
        if (!response.ok) {
          return errAsync(new P24ApiError(new Error(response.statusText)));
        }
        return ResultAsync.fromPromise(
          response.json(),
          (error) => new P24ApiError(error as Error)
        );
      })
      .andThen((data) => {
        if (!data.data) {
          return errAsync(new P24ApiError(new Error("Invalid P24 API response format")));
        }
        return okAsync(data.data);
      })
  );
};


const findTransaction = (email: string, id: string) => {
  return ResultAsync.fromPromise(
    db
      .select()
      .from(transactions)
      .where(eq(transactions.email, email))
      .then((transactions) => transactions.find((t) => t.sessionId === id)),
    (error) => new DatabaseError(error as Error)
  ).andThen((transDB) => {
    if (!transDB) {
      return errAsync(new TransactionNotFoundError(new Error("Transaction not found")));
    }
    return okAsync(transDB);
  });
};

const handleError = (error: Error, res: NextApiResponse) => {
  if (error instanceof AuthenticationError) {
    return res.status(401).json({ message: error.message });
  }
  if (error instanceof TransactionNotFoundError) {
    return res.status(404).json({ message: error.message });
  }
  if (error instanceof P24ApiError) {
    return res.status(502).json({ message: error.message });
  }
  if (error instanceof DatabaseError) {
    return res.status(500).json({ message: error.message });
  }
  // Fallback for unknown errors
  return res.status(500).json({ message: "Internal Server Error" });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // TODO: add validation
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Bad Request" });
  }


  return withAuth(req, res)
    .andThen(({email}) => ResultAsync.combine([
      findTransaction(email, id as string),
      getP24Transaction(id as string)
    ]))
    .andThen(([transDB, transP24]): ResultAsync<TransactionStatus, Error> => {
      switch (transP24.status) {
        case 0:
          return okAsync('no-payment');
        case 1:
          return verifyTransaction(transDB.sessionId, transP24.amount, transP24.currency, transP24.orderId);
        case 2:
          return okAsync('already-verified');
        default:
          return errAsync(new Error("Invalid transaction status"));
      }
    })
    .match(
      (status) => res.status(200).json({ status }),
      (error) => handleError(error, res)
    );
}