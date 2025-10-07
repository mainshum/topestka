import NextAuth, { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { account, user as userTable, verificationToken } from "@/drizzle/schema";
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
    usersTable: userTable,
    accountsTable: account,
    verificationTokensTable: verificationToken,
  }),
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
    async session({ session, trigger, newSession }) {
      try {
        logInfo("Session callback triggered", { 
          userId: session.user?.email, 
          trigger,
          userEmail: session.user?.email 
        });

        const use = await db.select().from(userTable).where(eq(userTable.email, session.user?.email));

        if (use.length !== 1) {
          logError("User not found in database", undefined, { userId: session.user?.email });
          return session;
        }

        const {hasAccess, quizPassed, id} = use[0];

        session.user = { ...session.user, hasAccess, quizPassed, id };

        logInfo("Session updated successfully", { 
          userEmail: session.user?.email, 
          hasAccess, 
          quizPassed 
        });

        return session;
      } catch (error) {
        logError("Error in session callback", error as Error, { userEmail: session.user?.email });
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
