import prisma from "../lib/prisma";

export class ItemTypeService {
  private readonly baseSelect = {
    id: true,
    name: true,
  };

  /**
   * @param select - Optional fields to include (merged with default fields).
   * @returns {Promise<ItemType[]>} - List of all item types
   *
   * @throws Will throw an error if the item type is not found or if there is a database error
   */
  async getAllItemTypes(select?: object) {
    return prisma.itemType.findMany({
      select: { ...this.baseSelect, ...select },
    });
  }

  /**
   * @param id - The ID of the item type to fetch
   * @param select - Optional fields to include (merged with default fields).
   * @returns {Promise<ItemType | null>} - The fetched item type or null if not found
   *
   * @throws Will throw an error if the item type is not found or if there is a database error
   */
  async getItemTypeById(id: number, select?: object) {
    return prisma.itemType.findUniqueOrThrow({
      select: { ...this.baseSelect, ...select },
      where: { id },
    });
  }

  /**
   * @param itemTypeData - The data for the new item type
   * @returns {Promise<ItemType>} - The created item type
   *
   * @throws Will throw an error if the item type creation fails or if there is a database error
   */
  async createItemType(itemTypeData: { name: string }) {
    return prisma.itemType.create({
      data: {
        name: itemTypeData.name,
      },
    });
  }

  /**
   * @param id - The ID of the item type to delete
   * @returns {Promise<ItemType>} - The deleted item type
   *
   * @throws Will throw an error if the item type deletion fails or if there is a database error
   */
  async removeItemType(id: number) {
    return prisma.itemType.delete({
      where: { id },
    });
  }
}
