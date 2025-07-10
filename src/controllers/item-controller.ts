import { Request, Response } from "express";
import { ItemService } from "../services/item-service";
import { handleApiResponse } from "../utils/handle-api-response";
import z from "zod";
import { positiveId } from "../validators/number";

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
        id: positiveId,
      })
      .parse(req.params);

    return await this.itemService.getItemById(validated.id);
  });
}

export const itemsController = new ItemsController();
