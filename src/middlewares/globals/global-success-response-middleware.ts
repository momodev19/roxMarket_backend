import { Request, Response, NextFunction } from "express";

export const globalSuccessResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) return;

  // You can format the response however you like
  return res.status(res.statusCode ?? 200).json(res.locals.data);
};
