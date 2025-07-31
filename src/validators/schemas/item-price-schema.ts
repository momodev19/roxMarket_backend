import { z } from "zod";
import { positiveInteger, typeField } from "../zod-schema-fragments";

export const itemPriceIdParamSchema = z.object({
  id: positiveInteger,
});

export const createItemPriceBodySchema = z.object({
  itemId: positiveInteger,
  price: positiveInteger,
  date: z.coerce.date(),
});

export const optionalItemPriceBodySchema = z.object({
  itemId: positiveInteger.optional(),
  price: positiveInteger.optional(),
  date: z.coerce.date().optional(),
});

export const optionalTypeQuerySchema = z.object({
  type: typeField.optional(),
});
