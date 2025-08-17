import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { ServerResponse } from "http";
import { IncomingMessage } from "http";

// Custom error types for better error handling
export class AuthenticationError extends Error {
  constructor(originalError: Error) {
    super(originalError.message);
    this.name = "AuthenticationError";
  }
}

export class DatabaseError extends Error {
  constructor(originalError: Error) {
    super(originalError.message);
    this.name = "DatabaseError";
  }
}

const parseSession = (session: Session | null) => {
  if (!session || !session.user?.email) {
    return errAsync(new AuthenticationError(new Error("Unauthorized")));
  }
  return okAsync({ email: session.user.email });
};

export const withAuth = (...params: Parameters<typeof getServerSession>) => {
  if (process.env.NODE_ENV === "development") {
    return okAsync({ email: "test@test.com" });
  }
  return ResultAsync.fromPromise(
    getServerSession(...params),
    (error) => new AuthenticationError(error as Error)
  ).andThen(parseSession);
};
