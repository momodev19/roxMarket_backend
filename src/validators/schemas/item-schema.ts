import { z } from "zod";

export const itemParamsSchema = z.object({
  id: z.coerce.number().int().positive("ID must be a positive integer"),
});

export const itemBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.coerce.number().int(),
});

export const itemUpdateBodySchema = z
  .object({
    name: z.string().optional(),
    type: z.coerce.number().int().optional(),
  })
  .refine(
    (data) => {
      // Ensure at least one field is provided for update
      return data.name !== undefined || data.type !== undefined;
    },
    {
      message: "At least one field (name or type) must be provided for update",
    }
  );
