import { router } from '../trpc';
import { transactionRouter } from './transaction';
import { userRouter } from './userRouter';

export const appRouter = router({
  transaction: transactionRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
