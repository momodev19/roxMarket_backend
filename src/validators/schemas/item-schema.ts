import { z } from "zod";

export const itemParamsSchema = z.object({
  id: z.coerce.number().int().positive("ID must be a positive integer"),
});

export const itemBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.coerce.number().int(),
});
