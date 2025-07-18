import { Response } from "express";
import { Prisma } from "@prisma/client";

export const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError,
  res: Response
): Response => {
  const isDev = process.env.NODE_ENV === "dev";

  const sendError = (status: number, message: string, code: string) =>
    res.status(status).json({
      message,
      code,
      ...(isDev && { prismaCode: error.code, meta: error.meta }),
    });

  switch (error.code) {
    case "P2002": // Unique constraint failed
      return sendError(409, "Resource already exists", "UNIQUE_CONSTRAINT");

    case "P2025": // Record not found
      return sendError(404, "Resource not found", "RECORD_NOT_FOUND");

    case "P2003": // Foreign key constraint failed
      return sendError(
        400,
        "Foreign key constraint failed",
        "FOREIGN_KEY_CONSTRAINT"
      );

    case "P2000": // Value too long for column
      return sendError(400, "Value too long for field", "VALUE_TOO_LONG");

    default:
      return sendError(400, "Database error", "PRISMA_ERROR");
  }
};
