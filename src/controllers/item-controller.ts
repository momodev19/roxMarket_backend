import { Request, Response } from "express";
import { ItemService } from "../services/item-service";
import { ItemTypeService } from "../services/item-type-service";
import z from "zod";
import { Item } from "@prisma/client";
import {
  itemParamsSchema,
  itemBodySchema,
} from "../validators/schemas/item-schema";

type ItemParams = z.infer<typeof itemParamsSchema>;
type ItemBody = z.infer<typeof itemBodySchema>;

export class ItemsController {
  itemService = new ItemService();
  itemTypeService = new ItemTypeService();

  /**
   * Get all items
   */
  getItems = async (): Promise<Item[]> => {
    return await this.itemService.getAllItems();
  };

  /**
   * Get item by ID
   * @throws {Error} If item not found
   * @throws {Error} If ID is invalid
   * @throws {Error} If ID is not a positive integer
   */
  getItemById = async (req: Request<ItemParams>): Promise<Partial<Item>> => {
    return await this.itemService.getItemById(req.params.id);
  };

  /**
   * Create a new item
   * @throws {Error} If item creation fails
   */
  createItem = async (req: Request<ItemBody>): Promise<object> => {
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
   * Delete an item by ID
   * @throws {Error} If item deletion fails
   * @throws {Error} If ID is invalid
   * @throws {Error} If ID is not a positive integer
   */
  removeItem = async (req: Request, res: Response): Promise<void> => {
    const validated = z
      .object({
        id: z.coerce.number().int().positive("ID must be a positive integer"),
      })
      .parse(req.params);

    await this.itemService.removeItem(validated.id);
    res.status(204).send(); // No content response after deletion
  };
}

export const itemsController = new ItemsController();
