import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "../../utils/handle-prisma-error-response";

export const globalErrorResponseMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaRepsonse = handlePrismaError(err, res);
    if (prismaRepsonse) {
      return prismaRepsonse;
    }
  }

  return res.status(500).json({
    error: err?.message || "Internal Server Error",
  });
};
