import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { errAsync, okAsync, ResultAsync } from "neverthrow";

// Custom error types for better error handling
export class AuthenticationError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class DatabaseError extends Error {
  constructor(message: string = "Database error") {
    super(message);
    this.name = "DatabaseError";
  }
}

const parseSession = (session: Session | null) => {
  if (!session || !session.user?.email) {
    return errAsync(new AuthenticationError());
  }
  return okAsync({ email: session.user.email });
};

export const withAuth = (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV === "development") {
    return okAsync({ email: "test@test.com" });
  }
  return ResultAsync.fromPromise(
    getServerSession(req, res, authOptions),
    (error) => new DatabaseError("Failed to get server session")
  ).andThen(parseSession);
};
