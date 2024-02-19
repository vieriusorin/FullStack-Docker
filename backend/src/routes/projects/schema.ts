import { body } from 'express-validator';

export const taskValidator = [
  body('title')
    .exists()
    .isString(),
  body('description')
    .isString()
    .optional(),
  body('completed')
    .isBoolean()
    .optional(),
  body('users')
    .isArray()
    .optional(),
  body('userId')
    .isString()
    .optional(),
  body('category')
    .isArray()
    .optional(),
  body('status')
    .isString()
    .optional(),
  body('startProject')
    .isDate()
    .optional(),
  body('endProject')
    .isDate()
    .optional(),
  body('tasks')
    .isArray()
    .optional(),
  body('client')
    .isString()
    .optional(),
  body('invoices')
    .isArray()
    .optional(),
  body('stakeholder')
    .isArray()
    .optional(),
  body('comments')
    .isArray()
    .optional()


]