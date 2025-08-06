import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/utils/db/pool";
import { transactions } from "@/utils/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { errAsync, okAsync, ResultAsync } from "neverthrow";

// Custom error types for better error handling
class AuthenticationError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "AuthenticationError";
  }
}

class TransactionNotFoundError extends Error {
  constructor(message: string = "Transaction not found") {
    super(message);
    this.name = "TransactionNotFoundError";
  }
}

class P24ApiError extends Error {
  constructor(message: string = "P24 API error") {
    super(message);
    this.name = "P24ApiError";
  }
}

class DatabaseError extends Error {
  constructor(message: string = "Database error") {
    super(message);
    this.name = "DatabaseError";
  }
}

export type P24TransactionStatus = {
  0: 'no-payment',
  1: 'advance payment',
  2: 'payment made',
  3: 'payment returned',
}

export type P24TransactionById = {
  statement: string,
  orderId: number,
  sessionId: string,
  status: keyof P24TransactionStatus,
  amount: number,
  currency: string,
  date: string,
  dateOfTransaction: string,
  clientEmail: string,
  accountMD5: string,
  paymentMethod: number,
  description: string,
  clientName: string,
  clientAddress: string,
  clientCity: string,
  clientPostcode: string,
  batchId: number,
  fee: string
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
      (error) => new P24ApiError("Failed to connect to P24 API")
    )
      .andThen((response) => {
        if (!response.ok) {
          return errAsync(new P24ApiError(`P24 API returned ${response.status}`));
        }
        return ResultAsync.fromPromise(
          response.json(),
          (error) => new P24ApiError("Failed to parse P24 API response")
        );
      })
      .andThen((data) => {
        if (!data.data) {
          return errAsync(new P24ApiError("Invalid P24 API response format"));
        }
        return okAsync(data.data);
      })
  );
};

const parseSession = (session: Session | null) => {
  if (!session || !session.user?.email) {
    return errAsync(new AuthenticationError());
  }
  return okAsync({ email: session.user.email });
};

const withAuth = (req: NextApiRequest, res: NextApiResponse) => {
  return ResultAsync.fromPromise(
    getServerSession(req, res, authOptions),
    (error) => new DatabaseError("Failed to get server session")
  ).andThen(parseSession);
};

const findTransaction = (email: string, id: string) => {
  return ResultAsync.fromPromise(
    db
      .select()
      .from(transactions)
      .where(eq(transactions.email, email))
      .then((transactions) => transactions.find((t) => t.sessionId === id)),
    (error) => new DatabaseError("Failed to query database")
  ).andThen((transDB) => {
    if (!transDB) {
      return errAsync(new TransactionNotFoundError());
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
    .andThen(({ email }) => findTransaction(email, id as string))
    .andThen((transDB) => getP24Transaction(transDB.sessionId))
    .match(
      (status) => res.status(200).json({ status }),
      (error) => handleError(error, res)
    );
}
