import prisma from "../lib/prisma";
import { Item, ItemPrice } from "@prisma/client";

type ItemWithPrice = {
  id: number;
  name: string;
  typeId: number;
  price: number;
};

export class ItemService {
  private readonly baseSelect = {
    id: true,
    name: true,
    typeId: true,
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
   * Updates an existing item.
   */
  async updateItem(
    id: number,
    itemData: { name?: string; type?: number }
  ): Promise<Partial<Item>> {
    return prisma.item.update({
      where: { id },
      data: {
        name: itemData.name,
        typeId: itemData.type,
      },
      select: { ...this.baseSelect, ...{ typeId: true } },
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

  async getItemsWithPrice(
    select?: Partial<Record<keyof Item, boolean>>
  ): Promise<ItemWithPrice[]> {
    const items = await prisma.item.findMany({
      select: {
        ...this.baseSelect,
        ...select,
        ItemPrice: {
          take: 1,
          select: { price: true },
          orderBy: { created_at: "desc" }, // Get the latest price
        },
      },
    });

    return items.map(({ ItemPrice, ...item }) => ({
      ...item,
      price: ItemPrice[0]?.price || 0,
    }));
  }
}
