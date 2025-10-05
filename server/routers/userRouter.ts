import { getDefault, safeParse, string } from "valibot";
import { authenticatedProcedure, router } from "../trpc";
import { db } from "@/utils/db/pool";
import { completedItems as completedItemsTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { completedItemsSchema } from "@/components/kurs/data";
import { logInfo, logError } from "@/utils/logger";
import { TRPCError } from "@trpc/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { user } from "@/drizzle/schema";

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

        const now = new Date().toISOString();

        await db
          .insert(completedItemsTable)
          .values({
            userId: ctx.user.id,
            id: ctx.user.id,
            completedSubchapters: JSON.stringify(input),
            createdAt: now,
            updatedAt: now,
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
  downloadFile: authenticatedProcedure
    .input(string())
    .mutation(async ({ ctx, input }) => {
      try {
        logInfo("Pobieranie pliku", { 
          userId: ctx.user.id,
          filename: input 
        });

        if (!ctx.user.hasAccess) {
          logError("Brak dostępu do pobierania plików", undefined, { 
            userId: ctx.user.id,
            filename: input 
          });
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Brak dostępu do pobierania plików",
          });
        }

        // Define allowed files for security
        const allowedFiles = [
          "bezpestkowe_broszura_1.pdf",
          "bezpestkowe_broszura_2.pdf", 
          "bezpestkowe_broszura_3.pdf",
          "bezpestkowe_certyfikat.pdf"
        ];

        if (!allowedFiles.includes(input)) {
          logError("Pobieranie nieautoryzowanego pliku", undefined, { 
            userId: ctx.user.id,
            filename: input 
          });
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Plik nie jest dostępny do pobierania",
          });
        }

        // Read the file from public directory
        const filePath = join(process.cwd(), "private", input);
        const fileBuffer = await readFile(filePath);

        logInfo("Plik pobrany pomyślnie", { 
          userId: ctx.user.id,
          filename: input,
          fileSize: fileBuffer.length 
        });

        return {
          filename: input,
          data: fileBuffer.toString("base64"),
          mimeType: "application/pdf"
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        logError("Failed to download file", error as Error, { 
          userId: ctx.user.id,
          filename: input 
        });
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to download file",
        });
      }
    }),
  updateQuizStatus: authenticatedProcedure
    .mutation(async ({ ctx }) => {
      try {
        logInfo("Updating quiz status", { userId: ctx.user.id });

        await db
          .update(user)
          .set({ quizPassed: 1 })
          .where(eq(user.id, ctx.user.id));

        logInfo("Quiz status updated successfully", { userId: ctx.user.id });
        return true;
      } catch (error) {
        logError("Failed to update quiz status", error as Error, { userId: ctx.user.id });
        throw error;
      }
    }),
});
