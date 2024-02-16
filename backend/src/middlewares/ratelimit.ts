import { Request, Response, NextFunction } from 'express'
import { rateLimit } from 'express-rate-limit'

// Configure rate limiter for different endpoints (optional)
export const signUpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req: Request, res: Response, next: NextFunction) => {
    res.status(429).json({
      status: 'error',
      message: 'Too many requests from this IP, please try again in 15 minutes'
    });
  }
}); // Limit each IP to 100 requests per 15 minutes

export const signInLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
  handler: (req: Request, res: Response, next: NextFunction) => {
    res.status(429).json({
      status: 'error',
      message: 'Too many requests from this IP, please try again in 1 minute'
    });
  }
}); // Limit each IP to 30 requests per minute