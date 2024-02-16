import { check } from 'express-validator';

export const signInSchema = [
  check('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password')
    .exists()
    .withMessage('Password is required'),
]