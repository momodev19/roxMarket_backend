import { z } from "zod";
import { ITEM_TYPE_IDS } from "../constants/itemTypes";

export const positiveInteger = z.coerce
  .number()
  .int()
  .positive("Must be a positive integer");

export const typeField = z
  .enum(Object.values(ITEM_TYPE_IDS).map(String) as [string, ...[]])
  .transform(Number);
