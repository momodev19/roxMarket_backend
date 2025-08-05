import { z } from "zod";
import { positiveInteger, typeField } from "../zod-schema-fragments";

export const itemIdParamSchema = z
  .object({
    id: positiveInteger,
  })
  .strict();

export const itemBodySchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    type: typeField,
  })
  .strict();

export const optionalItemBodySchema = z
  .object({
    name: z.string().optional(),
    type: typeField.optional(),
  })
  .refine(
    (data) => {
      // Ensure at least one field is provided for update
      return data.name !== undefined || data.type !== undefined;
    },
    {
      message: "At least one field (name or type) must be provided for update",
    }
  )
  .strict();
