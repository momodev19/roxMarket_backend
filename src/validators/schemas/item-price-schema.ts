import { z } from "zod";
import { positiveInteger, typeField } from "../zod-schema-fragments";

export const itemPriceIdParamSchema = z
  .object({
    id: positiveInteger,
  })
  .strict();

export const createItemPriceBodySchema = z
  .object({
    itemId: positiveInteger,
    price: positiveInteger,
    date: z.coerce.date(),
  })
  .strict();

export const optionalItemPriceBodySchema = z
  .object({
    itemId: positiveInteger.optional(),
    price: positiveInteger.optional(),
    date: z.coerce.date().optional(),
  })
  .strict();

export const optionalTypeQuerySchema = z
  .object({
    typeId: typeField.optional(),
  })
  .strict();
