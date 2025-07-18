import prisma from "../lib/prisma";
import { Item, ItemPrice } from "@prisma/client";

export type ItemWithPrice = {
  id: number;
  name: string;
  typeId: number;
  price: number;
};

type ItemSelectType = Partial<Record<keyof Item, boolean>>;

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
  async getAllItems(select?: ItemSelectType): Promise<Item[]> {
    return prisma.item.findMany({ select: { ...this.baseSelect, ...select } });
  }

  /**
   * @param id - The ID of the item to fetch
   * @param select - Optional fields to include (merged with default fields).
   * @returns {Promise<Item | null>} - The fetched item or null if not found
   *
   * @throws Will throw an error if the item is not found or if there is a database error
   */
  async getItemById(id: number, select?: ItemSelectType): Promise<Item> {
    return prisma.item.findUniqueOrThrow({
      select: { ...this.baseSelect, ...select },
      where: { id },
    });
  }

  /**
   * @param itemData - The data for the new item
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
   * @param id - The ID of the item to update
   * @param itemData - The data for the updated item
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
   *
   * @throws Will throw an error if the item deletion fails or if there is a database error
   */
  async removeItem(id: number): Promise<Item> {
    return prisma.item.delete({
      where: { id },
    });
  }

  /**
   * get all items with their latest price
   * @param select - Optional fields to include (merged with default fields).
   */
  async getItemsWithPrice(select?: ItemSelectType): Promise<ItemWithPrice[]> {
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

  /**
   * getting an item with all its prices
   * @param id - The ID of the item to fetch
   * @param select - Optional fields to include (merged with default fields).
   *
   * @throws Will throw an error if the item is not found or if there is a database error
   */
  async getItemWithAllPrices(
    id: number,
    select?: ItemSelectType
  ): Promise<Item & { prices: { price: number; date: Date }[] }> {
    const { ItemPrice, ...items } = await prisma.item.findUniqueOrThrow({
      select: {
        ...this.baseSelect,
        ...select,
        ItemPrice: {
          select: { price: true, date: true },
          orderBy: { created_at: "desc" },
        },
      },
      where: { id },
    });

    return {
      ...items,
      prices: ItemPrice,
    };
  }
}
