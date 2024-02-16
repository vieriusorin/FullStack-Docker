import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express'

export const errorMiddleware = (err, req: Request, res: Response, next: NextFunction) => {
  // const errors = validationResult(req);
  // if (errors.isEmpty()) {
  //   // Handle validation errors
  //   res.status(400).json({ errors: err.errors });
  // } else if (err.type === 'input') {
  //   // Handle custom input errors
  //   res.status(400).json({ message: err.message });
  // } else {
  //   // Handle unknown errors
  //   console.error(err.stack); // Log the error for debugging
  //   res.status(500).json({ message: 'Internal Server Error' });
  // }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  else {
    next();
  }
};