import { Request, Response } from "express";
import z from "zod";
import { ItemTypeService } from "../services/item-type-service";
import { ItemType } from "@prisma/client";

export class ItemTypeController {
  itemTypeService = new ItemTypeService();

  getItemTypes = async (): Promise<Partial<ItemType>[]> => {
    return await this.itemTypeService.getAllItemTypes();
  };
}

export const itemTypeController = new ItemTypeController();
