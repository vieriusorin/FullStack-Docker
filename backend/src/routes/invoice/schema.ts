import { body } from 'express-validator';

export const invoiceValidator = [
  body('title')
    .exists()
    .isString(),
  body('description')
    .isString()
    .optional(),
  body('amount')
    .isFloat(),
]