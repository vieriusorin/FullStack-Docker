import { body } from 'express-validator';

export const taskValidator = [
  body('title')
    .exists()
    .isString(),
  body('description')
    .isString()
    .optional(),
  // body('project')
  //   .isString()
  //   .optional(),
  // body('taskId')
  //   .isString()
  //   .optional(),
  // body('user')
  //   .isString()
  //   .optional(),
  // body('userId')
  //   .isString()
  //   .optional(),
  // body('comments')
  //   .isArray()
  //   .optional()
]