import prisma from "../lib/prisma";

export class ItemService {
  private readonly baseSelect = {
    id: true,
    name: true,
  };

  /**
   * @param select - Optional fields to include (merged with default fields).
   * @returns {Promise<Item[]>} - List of all items
   *
   * @throws Will throw an error if the item is not found or if there is a database error
   */
  async getAllItems(select?: object) {
    return prisma.item.findMany({ select: { ...this.baseSelect, ...select } });
  }

  /**
   * @param id - The ID of the item to fetch
   * @param select - Optional fields to include (merged with default fields).
   * @returns {Promise<Item | null>} - The fetched item or null if not found
   *
   * @throws Will throw an error if the item is not found or if there is a database error
   */
  async getItemById(id: number, select?: object) {
    console.log("Fetching item with ID:", id);
    return prisma.item.findUniqueOrThrow({
      select: { ...this.baseSelect, ...select },
      where: { id },
    });
  }
}
