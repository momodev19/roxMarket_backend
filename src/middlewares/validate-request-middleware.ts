import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

type ValidationSchemas = {
  body?: ZodType<any, any, any>;
  params?: ZodType<any, any, any>;
  query?: ZodType<any, any, any>;
};

export const validateRequest =
  (schemas: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        res.locals.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        res.locals.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        res.locals.query = schemas.query.parse(req.query);
      }
      next();
    } catch (error: any) {
      throw error;
    }
  };
