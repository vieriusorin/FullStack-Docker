import express, { Request, Response, NextFunction } from 'express';
import { check } from "express-validator";
import morgan from "morgan";
import cors from "cors";

import { signUp, signIn } from './handlers/user';
import { errorMiddleware } from './modules/middleware';

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
  check('email').isEmail().withMessage('Invalid email'),
  check('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  errorMiddleware,
  signUp
);
app.post(
  '/api/sign-in',
  check('email')
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
      message: 'invalid input'
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