import { z } from "zod";

export const itemPriceIdParamSchema = z.object({
  id: z.coerce.number().int().positive("ID must be a positive integer"),
});

export const createItemPriceBodySchema = z.object({
  itemId: z.coerce
    .number()
    .int()
    .positive("Item ID must be a positive integer"),
  price: z.coerce.number().int().positive("Price must be a positive number"),
  date: z.coerce.date(),
});

export const updateItemPriceBodySchema = z.object({
  itemId: z.coerce
    .number()
    .int()
    .positive("Item ID must be a positive integer")
    .optional(),
  price: z.coerce
    .number()
    .int()
    .positive("Price must be a positive number")
    .optional(),
  date: z.coerce.date().optional(),
});
