import prisma from "../lib/prisma";
import { ItemPrice } from "@prisma/client";

export class ItemPriceService {
  private readonly baseSelect = {
    id: true,
    itemId: true,
    price: true,
  };

  // async getItemsWithPrice(): Promise<Partial<ItemPrice[]>> {
  //   return await prisma.item.findMany({
  //     include: {
  //       ItemPrice: {
  //         take: 1,

  //       }
  //   });
  // }
}
