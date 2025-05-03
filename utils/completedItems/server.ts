import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "../db/pool";
import { completedItems } from "../db/schema";
import { eq } from "drizzle-orm";
import { CompletedItemsType } from "./types";

// Function to get completed items for server-side props
export async function getCompletedItems(
  req: any,
  res: any,
  itemType: CompletedItemsType
): Promise<string[]> {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session?.user?.id) {
    return [];
  }

  try {
    // Find user's completed items record
    const userCompletedItems = await db
      .select()
      .from(completedItems)
      .where(eq(completedItems.userId, session.user.id));

    if (userCompletedItems.length === 0) {
      return [];
    }

    // Get the completed items string and parse it
    const completedItemsStr = userCompletedItems[0][itemType] || '';
    return completedItemsStr ? completedItemsStr.split(',') : [];
  } catch (error) {
    console.error(`Failed to fetch ${itemType}:`, error);
    return [];
  }
}