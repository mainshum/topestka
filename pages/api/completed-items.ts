import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { db } from "@/utils/db/pool";
import { completedItems } from "@/utils/db/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm";
import { CompletedItemsType } from "@/utils/completedItems/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { itemType, itemId } = req.body;

  if (
    typeof itemType !== "string" ||
    typeof itemId !== "string" ||
    !['completedSubchapters', 'completedQuizzes', 'completedFlashcards'].includes(itemType)
  ) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    // Find user's completed items record
    const userCompletedItems = await db
      .select()
      .from(completedItems)
      .where(eq(completedItems.userId, session.user.id));

    if (userCompletedItems.length === 0) {
      // Create new record if not found
      await db.insert(completedItems).values({
        userId: session.user.id,
        [itemType]: itemId,
        updatedAt: new Date(),
      });
    } else {
      // Update existing record
      const currentItems = userCompletedItems[0][itemType as keyof typeof userCompletedItems[0]] as string || '';
      const itemsArray = currentItems ? currentItems.split(',') : [];
      
      // Add item if not already in the list
      if (!itemsArray.includes(itemId)) {
        itemsArray.push(itemId);
        
        await db.update(completedItems)
          .set({
            [itemType]: itemsArray.join(','),
            updatedAt: new Date(),
          } as any)
          .where(eq(completedItems.userId, session.user.id));
      }
    }

    return res.status(200).json({ message: "Item marked as completed" });
  } catch (error) {
    console.error("Failed to update completed item:", error);
    return res.status(500).json({ message: "Failed to update completed item" });
  }
}