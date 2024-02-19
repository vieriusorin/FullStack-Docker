import { Request, Response, NextFunction } from 'express';

export const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized. Bearer token missing.'
    });
  } else {
    next();
  }
}