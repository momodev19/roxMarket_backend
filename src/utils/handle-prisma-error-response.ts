import { Response } from "express";
import { Prisma } from "@prisma/client";

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError,
  res: Response
) => {
  switch (error.code) {
    case "P2002": // Unique constraint failed
      return res.status(409).json({ error: "Resource already exists" });

    case "P2025": // Record not found
      return res.status(404).json({ error: "Resource not found" });

    // Add other Prisma error codes here:
    case "P2003": // Foreign key constraint failed
      return res.status(400).json({ error: "Foreign key constraint failed" });

    case "P2000": // Value too long for column
      return res.status(400).json({ error: "Value too long for field" });

    // fallback for unhandled Prisma errors
    default:
      return res.status(400).json({ error: "Database error" });
  }
};
