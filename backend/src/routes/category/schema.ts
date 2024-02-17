import { body } from 'express-validator';

export const categoryValidator = [
  body('title')
    .exists()
    .isString(),
  body('description')
    .isString()
    .optional()
]