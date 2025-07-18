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

  async getItemPriceById(id: number, select?: ItemPriceSelectType) {
    return prisma.itemPrice.findUniqueOrThrow({
      select: { ...this.baseSelect, ...select },
      where: { id },
    });
  }
}
