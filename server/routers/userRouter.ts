import { getDefault, safeParse } from "valibot";
import { authenticatedProcedure, router } from "../trpc";
import { db } from "@/utils/db/pool";
import { completedItems as completedItemsTable } from "@/utils/db/schema";
import { eq } from "drizzle-orm";
import { completedItemsSchema } from "@/components/kurs/data";
import { logInfo, logError } from "@/utils/logger";

export const userRouter = router({
  getCompletedItems: authenticatedProcedure.query(async ({ ctx }) => {
    try {
      logInfo("Getting completed items", { userId: ctx.user.id });
      
      const res = await db
        .select()
        .from(completedItemsTable)
        .where(eq(completedItemsTable.userId, ctx.user.id));

      const completedItemsParsed = safeParse(
        completedItemsSchema,
        res?.[0]?.completedSubchapters
      );

      const result = completedItemsParsed.success
        ? completedItemsParsed.output
        : getDefault(completedItemsSchema);

      logInfo("Completed items retrieved successfully", { 
        userId: ctx.user.id,
        itemsCount: Array.isArray(result) ? result.length : 0
      });

      return result;
    } catch (error) {
      logError("Failed to get completed items", error as Error, { userId: ctx.user.id });
      throw error;
    }
  }),
  saveCompletedItems: authenticatedProcedure
    .input(completedItemsSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        logInfo("Saving completed items", { 
          userId: ctx.user.id,
          itemsCount: Array.isArray(input) ? input.length : 0
        });

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

        logInfo("Completed items saved successfully", { userId: ctx.user.id });
      } catch (error) {
        logError("Failed to save completed items", error as Error, { userId: ctx.user.id });
        throw error;
      }
    }),
});
