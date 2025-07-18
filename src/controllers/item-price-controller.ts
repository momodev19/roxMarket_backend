import { Request, Response } from "express";
import { ItemPriceService } from "../services/item-price-service";
import z from "zod";
import { itemPriceIdParamSchema } from "../validators/schemas/item-price-schema";
import { ItemPrice } from "@prisma/client";

type ItemPriceIdParams = z.infer<typeof itemPriceIdParamSchema>;

export class ItemPriceController {
  itemPriceService = new ItemPriceService();

  getPrice = async (
    req: Request<ItemPriceIdParams>
  ): Promise<Partial<ItemPrice>> => {
    return await this.itemPriceService.getItemPriceById(req.params.id);
  };

  createPrice = async (req: Request): Promise<Partial<ItemPrice>> => {
    return await this.itemPriceService.createItemPrice(req.body);
  };

  updatePrice = async (
    req: Request<
      ItemPriceIdParams,
      any,
      Partial<Pick<ItemPrice, "itemId" | "price" | "date">>
    >
  ): Promise<Partial<ItemPrice>> => {
    return await this.itemPriceService.updateItemPrice(req.params.id, req.body);
  };

  deletePrice = async (
    req: Request<ItemPriceIdParams>,
    res: Response
  ): Promise<void> => {
    await this.itemPriceService.deleteItemPrice(req.params.id);

    res.status(204);
    return;
  };
}

export const itemPriceController = new ItemPriceController();
