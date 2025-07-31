import { z } from "zod";
import { itemTypeIds } from "../constants/itemTypes";

export const positiveInteger = z.coerce
  .number()
  .int()
  .positive("Must be a positive integer");

export const typeField = z
  .enum(Object.values(itemTypeIds).map(String) as [string, ...[]])
  .transform(Number);
