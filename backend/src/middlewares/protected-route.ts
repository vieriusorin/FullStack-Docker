import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = {
        userId: decoded.userId,
      }
      next();
    } catch (error) {
      // Handle invalid or expired token
      console.error('Invalid or expired token ', error);
      res.clearCookie('auth');
      res.redirect('/login');
    }
  } else {
    // Redirect to login page if no cookie
    res.redirect('/login');
  }
}