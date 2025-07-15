import { Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "./handle-prisma-error-response";

type AsyncHandler = (req: Request, res: Response) => Promise<any>;

interface ApiResponseOptions {
  successStatus?: number;
  errorStatus?: number;
  errorMessage?: string;
}

/**
 * Wraps async route handlers to:
 * - Send standardized JSON success responses
 * - Catch errors (including Zod validation errors) and send standardized JSON error responses
 *
 * @param fn - The async function to handle the request
 * @param options - Options to customize response behavior
 * @returns {(req: Request, res: Response) => Promise<void>}
 */
export const handleApiResponse = (
  fn: AsyncHandler,
  options: ApiResponseOptions = {}
) => {
  const {
    successStatus = 200,
    errorStatus = 500,
    errorMessage = "Internal Server Error",
  } = options;

  return async (req: Request, res: Response) => {
    try {
      const data = await fn(req, res);
      res.status(successStatus).json(data);
    } catch (error: any) {
      // handle Zod validation errors
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));

        return res.status(400).json({
          error: "Validation error",
          details: formattedErrors,
        });
      }

      // handle Prisma errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const prismaRepsonse = handlePrismaError(error, res);
        if (prismaRepsonse) {
          return prismaRepsonse;
        }
      }

      res.status(errorStatus).json({
        error: error?.message || errorMessage,
      });
    }
  };
};
