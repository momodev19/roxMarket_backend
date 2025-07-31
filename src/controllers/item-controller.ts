import { Request, Response } from "express";
import { ItemService, ItemWithPrice } from "../services/item-service";
import { ItemTypeService } from "../services/item-type-service";
import z from "zod";
import { Item, ItemType } from "@prisma/client";
import {
  itemIdParamSchema,
  itemBodySchema,
} from "../validators/schemas/item-schema";

type ItemIdParams = z.infer<typeof itemIdParamSchema>;
type ItemBody = z.infer<typeof itemBodySchema>;

export class ItemsController {
  itemService = new ItemService();
  itemTypeService = new ItemTypeService();

  /**
   * Get all items
   */
  getItems = async (): Promise<Partial<Item[]>> => {
    return await this.itemService.getAllItems();
  };

  /**
   * Get item by ID
   * @throws {Error} If item not found
   */
  getItemById = async (req: Request<ItemIdParams>): Promise<Partial<Item>> => {
    return await this.itemService.getItemById(req.params.id);
  };

  /**
   * Create a new item
   * @throws {Error} If item creation fails
   */
  createItem = async (req: Request<ItemBody>): Promise<Item> => {
    const types = await this.itemTypeService.getAllItemTypes();
    const typeIds = types.map((type) => type.id);

    z.object({
      type: z.number().refine((t) => typeIds.includes(t), {
        message: `Type must be one of ${typeIds.join(", ")}`,
      }),
    }).parse(req.body);

    return await this.itemService.createItem(req.body);
  };

  /**
   * Update an existing item
   */
  updateItem = async (
    req: Request<ItemIdParams, Item, ItemBody>
  ): Promise<Partial<Item>> => {
    const types = await this.itemTypeService.getAllItemTypes();
    const typeIds = types.map((type) => type.id);

    z.object({
      type: z
        .number()
        .refine((t) => typeIds.includes(t), {
          message: `Type must be one of ${typeIds.join(", ")}`,
        })
        .optional(),
    }).parse(req.body);

    return await this.itemService.updateItem(req.params.id, req.body);
  };

  /**
   * Delete an item by ID
   * @throws {Error} If item deletion fails
   */
  removeItem = async (
    req: Request<ItemIdParams>,
    res: Response
  ): Promise<void> => {
    await this.itemService.removeItem(req.params.id);

    res.status(204);
    return;
  };

  /**
   * Get all items with their latest prices
   */
  getItemsWithPrice = async (
    req: Request,
    res: Response
  ): Promise<Partial<ItemWithPrice[]>> => {
    if (res.locals.query.type) {
      return await this.itemService.getItemsWithPrice(res.locals.query.type);
    }

    return await this.itemService.getItemsWithPrice();
  };

  /**
   * Get item by ID with all its prices
   * @throws {Error} If item not found
   */
  getItemWithAllPrices = async (req: Request<ItemIdParams>) => {
    return await this.itemService.getItemWithAllPrices(req.params.id);
  };
}

export const itemsController = new ItemsController();
