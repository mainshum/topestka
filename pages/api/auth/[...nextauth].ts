import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, accounts, users, verificationTokens } from "../../../utils/db/schema";
import EmailProvider from "next-auth/providers/email";

const transportObj = {
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "noreply@bezpestkowe.pl",
    pass: process.env.EMAIL_PASS,
  },
}

export default NextAuth({
  // TODO fix: https://github.com/nextauthjs/next-auth/issues/8280#issuecomment-2094369316
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    verificationTokensTable: verificationTokens,
  }) as any,
  providers: [
    EmailProvider({
      from: "noreply@bezpestkowe.pl",
      server: transportObj,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
});