import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { initTRPC, TRPCError } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession, Session } from 'next-auth';

export const createAuthContext =  async (opts: CreateNextContextOptions): Promise<Session> => {
  const session = await getServerSession(opts.req, opts.res, authOptions);
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }
  return session;
};

type Context = Awaited<ReturnType<typeof createAuthContext>>;

const t = initTRPC.context<Context>().create();

export const authenticatedProcedure = t.procedure.use(async ({ctx, next}) => next({ ctx: { ...ctx, user: ctx.user } }));

export const router = t.router;