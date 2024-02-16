import express, { Request, Response, NextFunction } from 'express';
import { body, check } from "express-validator";
import morgan from "morgan";
import cors from "cors";

import { signUp, signIn } from './handlers/user';
import { errorMiddleware, signUpLimiter, signInLimiter } from './middlewares';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post(
  '/api/sign-up',
  signUpLimiter,
  [
    body('email')
      .notEmpty().withMessage('Email is required.')
      .isEmail().withMessage('Email not valid.')
    ,
    body('password')
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  ],
  errorMiddleware,
  signUp
);

app.post(
  '/api/sign-in',
  signInLimiter,
  check('email')
    .trim()
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password')
    .exists()
    .withMessage('Password is required'),
  errorMiddleware,
  signIn
);

app.use((err, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'auth') {
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized'
    });
  } else if (err.type === 'input') {
    res.status(400).json({
      status: 'error',
      message: 'Invalid input'
    });
  } else if (err.type === 'userExists') {
    res.status(400).json({
      status: 'error',
      message: 'Email already exists'
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
})

export default app;