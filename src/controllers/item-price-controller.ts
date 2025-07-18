import { Request, Response } from "express";
import { ItemPrice } from "@prisma/client";
import { ItemPriceService } from "../services/item-price-service";
import z from "zod";
import { itemPriceIdParamsSchema } from "../validators/schemas/item-price-schema";

type itemPriceIdParams = z.infer<typeof itemPriceIdParamsSchema>;
export class ItemPriceController {
  itemPriceService = new ItemPriceService();

  getPrice = async (req: Request<itemPriceIdParams>) => {
    return await this.itemPriceService.getItemPriceById(req.params.id);
  };

  createPrice = async () => {};

  updatePrice = async () => {};

  deletePrice = async () => {};
}

export const itemPriceController = new ItemPriceController();
