import prisma from "../lib/prisma";
import { Item } from "@prisma/client";

export class ItemService {
  private readonly baseSelect = {
    id: true,
    name: true,
  };

  /**
   * @param select - Optional fields to include (merged with default fields).
   *
   * @throws Will throw an error if the item is not found or if there is a database error
   */
  async getAllItems(
    select?: Partial<Record<keyof Item, boolean>>
  ): Promise<Item[]> {
    return prisma.item.findMany({ select: { ...this.baseSelect, ...select } });
  }

  /**
   * @param id - The ID of the item to fetch
   * @param select - Optional fields to include (merged with default fields).
   * @returns {Promise<Item | null>} - The fetched item or null if not found
   *
   * @throws Will throw an error if the item is not found or if there is a database error
   */
  async getItemById(
    id: number,
    select?: Partial<Record<keyof Item, boolean>>
  ): Promise<Item> {
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
  async createItem(itemData: { name: string; type: number }): Promise<Item> {
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
  async removeItem(id: number): Promise<Item> {
    return prisma.item.delete({
      where: { id },
    });
  }
}
