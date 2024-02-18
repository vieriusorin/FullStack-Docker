import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import { taskValidator } from './schema';
import { create, readTasks, readTask, deleteTask, updateTask } from '../../handlers/task';

const router = express.Router();

router.post(
  '/api/tasks',
  taskValidator,
  validateRequest,
  create
)

router.get(
  '/api/tasks',
  validateRequest,
  readTasks
)

router.get(
  '/api/tasks/:id',
  validateRequest,
  readTask
)

router.patch(
  '/api/tasks/:id',
  taskValidator,
  validateRequest,
  updateTask
)

router.delete(
  '/api/tasks/:id',
  validateRequest,
  deleteTask
)

export { router as taskRouter }