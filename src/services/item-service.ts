import prisma from "../lib/prisma";
import { handlePrisma } from "../utils/handle-prisma";

export class ItemService {
  /**
   * @returns {Promise<Item[]>} - List of all items
   *
   * @throws Will throw an error if the item is not found or if there is a database error
   */
  async getAllItems() {
    return handlePrisma(prisma.item.findMany(), "Error fetching items");
  }

  /**
   * @param id - The ID of the item to fetch
   * @returns {Promise<Item | null>} - The fetched item or null if not found
   *
   * @throws Will throw an error if the item is not found or if there is a database error
   */
  async getItemById(id: number) {
    return handlePrisma(
      prisma.item.findUnique({ where: { id } }),
      `Error fetching item with ID ${id}`
    );
  }
}
