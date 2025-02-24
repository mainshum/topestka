import NextAuth, { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, users, verificationTokens } from "../../../utils/db/schema";
import EmailProvider from "next-auth/providers/email";
import { db } from "@/utils/db/pool";
import { eq } from "drizzle-orm";

const transportObj = {
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "noreply@bezpestkowe.pl",
    pass: process.env.EMAIL_PASS,
  },
};

export const authOptions: NextAuthOptions = {
  // TODO fix: https://github.com/nextauthjs/next-auth/issues/8280#issuecomment-2094369316
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    verificationTokensTable: verificationTokens,
  }) as any,
  pages: {
    verifyRequest: "/verify-request",
  },
  providers: [
    EmailProvider({
      from: "noreply@bezpestkowe.pl",
      server: transportObj,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const use = await db.select().from(users).where(eq(users.id, user.id));

      if (use.length !== 1) return session;

      const hasAccess = use[0].hasAccess;

      session.user = { ...session.user, hasAccess };

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
