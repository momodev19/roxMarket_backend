import { z } from "zod";

export const positiveId = z
  .string()
  .regex(/^\d+$/, "Must be a number")
  .transform(Number)
  .refine((val) => val > 0, "ID must be greater than 0");
