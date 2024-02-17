import { body } from 'express-validator'

export const userUpdateValidator = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .optional(),

  body('name')
    .isString()
    .optional(),

  body('username').isString().optional(),
  body('position').isString().optional(),
]