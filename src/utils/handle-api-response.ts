import { Request, RequestHandler, Response, NextFunction } from "express";

type AsyncHandler = (req: Request<any>, res: Response) => Promise<any>;

/**
 * Wraps async route handlers to:
 * - Send standardized JSON success responses
 * - Catch errors (including Zod validation errors) and send standardized JSON error responses
 *
 * @param fn - The async function to handle the request
 */
export const handleApiResponse = (fn: AsyncHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res);

      // If response already sent by handler, do nothing more
      if (res.headersSent) {
        return;
      }

      return res.status(res.statusCode ?? 200).json(data);
    } catch (error: any) {
      next(error);
    }
  };
};
