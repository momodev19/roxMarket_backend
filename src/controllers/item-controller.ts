import { Request, Response } from "express";
import { ItemService } from "../services/item-service";
import { handleApiResponse } from "../utils/handle-api-response";
import z from "zod";

export class ItemsController {
  itemService = new ItemService();

  /**
   * Get all items
   * @returns {Promise<Object>}
   */
  getItems = handleApiResponse(async (req: Request, res: Response) => {
    return await this.itemService.getAllItems();
  });

  /**
   * Get item by ID
   * @returns {Promise<Object>}
   * @throws {Error} If item not found
   * @throws {Error} If ID is invalid
   * @throws {Error} If ID is not a positive integer
   */
  getItemById = handleApiResponse(async (req: Request, res: Response) => {
    const validated = z
      .object({
        id: z.coerce.number().int().positive("ID must be a positive integer"),
      })
      .parse(req.params);

    return await this.itemService.getItemById(validated.id);
  });

  /**
   * Create a new item
   * @returns {Promise<Object>}
   * @throws {Error} If item creation fails
   */
  createItem = handleApiResponse(async (req: Request, res: Response) => {
    const types = [11, 12, 13, 14, 15];

    const itemData = z
      .object({
        name: z.string().min(1, "Name is required"),
        type: z
          .number()
          .int()
          .refine((type) => types.includes(type), {
            message: `Type must be one of ${types.join(", ")}`,
          }),
      })
      .parse(req.body);

    await this.itemService.createItem(itemData);
    return res.status(201).json({ message: "Item created" });
  });

  /**
   * Delete an item by ID
   * @returns {Promise<void>}
   * @throws {Error} If item deletion fails
   * @throws {Error} If ID is invalid
   * @throws {Error} If ID is not a positive integer
   */
  removeItem = handleApiResponse(async (req: Request, res: Response) => {
    const validated = z
      .object({
        id: z.coerce.number().int().positive("ID must be a positive integer"),
      })
      .parse(req.params);

    await this.itemService.removeItem(validated.id);
    return res.status(204).send(); // No content response after deletion
  });
}

export const itemsController = new ItemsController();
