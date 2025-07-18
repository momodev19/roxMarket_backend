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
  const isDev = process.env.NODE_ENV === "dev";

  if (err instanceof ZodError) {
    return res.status(400).json({
      code: "VALIDATION_ERROR",
      details: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  // handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaResonse = handlePrismaError(err, res);
    if (prismaResonse) {
      return prismaResonse;
    }
  }

  // Fallback generic error
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    code: err.code || "INTERNAL_ERROR",
    ...(isDev && { stack: err.stack }),
  });
};
