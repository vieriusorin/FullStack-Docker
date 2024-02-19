import { body } from 'express-validator';

export const stakeholderValidator = [
  body('name')
    .exists()
    .isString(),
  body('email')
    .exists()
    .isEmail(),
  body('role')
    .exists()
    .isString(),
  body('projectId')
    .isString()
    .optional()
]