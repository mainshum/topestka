import NextAuth, { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, users, verificationTokens } from "../../../utils/db/schema";
import EmailProvider from "next-auth/providers/email";
import { db } from "@/utils/db/pool";
import { eq } from "drizzle-orm";
import { logInfo, logError } from "@/utils/logger";

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
    async session({ session, trigger, newSession, user }) {
      try {
        logInfo("Session callback triggered", { 
          userId: user.id, 
          trigger,
          userEmail: session.user?.email 
        });

        const use = await db.select().from(users).where(eq(users.id, user.id));

        if (use.length !== 1) {
          logError("User not found in database", undefined, { userId: user.id });
          return session;
        }

        const {hasAccess, quizPassed} = use[0];

        session.user = { ...session.user, hasAccess, quizPassed };

        logInfo("Session updated successfully", { 
          userId: user.id, 
          hasAccess, 
          quizPassed 
        });

        return session;
      } catch (error) {
        logError("Error in session callback", error as Error, { userId: user.id });
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
