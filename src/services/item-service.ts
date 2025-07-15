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
    return prisma.item.findUniqueOrThrow({
      select: { ...this.baseSelect, ...select },
      where: { id },
    });
  }

  /**
   * @param itemData - The data for the new item
   * @returns {Promise<Item>} - The created item
   *
   * @throws Will throw an error if the item creation fails or if there is a database error
   */
  async createItem(itemData: { name: string; type: number }) {
    return prisma.item.create({
      data: {
        name: itemData.name,
        typeId: itemData.type,
      },
    });
  }

  /**
   * @param id - The ID of the item to delete
   * @returns {Promise<Item>} - The deleted item
   *
   * @throws Will throw an error if the item deletion fails or if there is a database error
   */
  async removeItem(id: number) {
    return prisma.item.delete({
      where: { id },
    });
  }
}
