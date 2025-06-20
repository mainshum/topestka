import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** Add the user's id */
      id: string;
      hasAccess: boolean;
    } & DefaultSession["user"];
  }
}
