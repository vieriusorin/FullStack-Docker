import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array(),
    });
  }

  console.log(err)

  console.log('Executing error handling middleware');
  res.status(500).json({ error: 'Internal Server Error' });
};
