import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express'

export const errorMiddleware = (err, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array(),
    });
  }
  next();
};
