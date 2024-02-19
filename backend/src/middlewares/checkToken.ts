import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkTokenMiddleware = async (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized. Bearer token missing.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized. Invalid Bearer token.',
    });
  }
}