import { getDefault, safeParse } from "valibot";
import { authenticatedProcedure, router } from "../trpc";
import { db } from "@/utils/db/pool";
import { completedItems as completedItemsTable } from "@/utils/db/schema";
import { eq } from "drizzle-orm";
import { completedItemsSchema } from "@/components/kurs/data";

export const userRouter = router({
  getCompletedItems: authenticatedProcedure.query(async ({ ctx }) => {
    const res = await db
      .select()
      .from(completedItemsTable)
      .where(eq(completedItemsTable.userId, ctx.user.id));

    const completedItemsParsed = safeParse(
      completedItemsSchema,
      res?.[0]?.completedSubchapters
    );

    return completedItemsParsed.success
      ? completedItemsParsed.output
      : getDefault(completedItemsSchema);
  }),
  saveCompletedItems: authenticatedProcedure
    .input(completedItemsSchema)
    .mutation(async ({ ctx, input }) => {
        console.log(ctx.user.id)
      await db
        .insert(completedItemsTable)
        .values({
          userId: ctx.user.id,
          id: ctx.user.id,
          completedSubchapters: JSON.stringify(input),
        })
        .onDuplicateKeyUpdate({
          set: {
            completedSubchapters: JSON.stringify(input),
          },
        });
    }),
});
