import prisma from "../lib/prisma";
import { ItemPrice } from "@prisma/client";

type ItemPriceSelectType = Partial<Record<keyof ItemPrice, boolean>>;

export class ItemPriceService {
  private readonly baseSelect = {
    id: true,
    itemId: true,
    price: true,
    date: true,
  };

  async getItemPriceById(
    id: number,
    select?: ItemPriceSelectType
  ): Promise<Partial<ItemPrice>> {
    return prisma.itemPrice.findUniqueOrThrow({
      select: { ...this.baseSelect, ...select },
      where: { id },
    });
  }

  async createItemPrice(itemPriceData: {
    itemId: number;
    price: number;
    date: Date;
  }): Promise<Partial<ItemPrice>> {
    return prisma.itemPrice.create({
      data: {
        itemId: itemPriceData.itemId,
        price: itemPriceData.price,
        date: itemPriceData.date,
      },
      select: this.baseSelect,
    });
  }

  async updateItemPrice(
    id: number,
    itemPriceData: {
      itemId?: number;
      price?: number;
      date?: Date;
    }
  ): Promise<Partial<ItemPrice>> {
    return prisma.itemPrice.update({
      where: { id },
      data: {
        itemId: itemPriceData.itemId,
        price: itemPriceData.price,
        date: itemPriceData.date,
      },
      select: this.baseSelect,
    });
  }

  async deleteItemPrice(id: number): Promise<ItemPrice> {
    return await prisma.itemPrice.delete({ where: { id } });
  }
}
