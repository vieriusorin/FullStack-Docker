import { body } from 'express-validator';

export const signInSchema = [
  body('email')
    .trim()
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .exists()
    .withMessage('Password is required'),
]