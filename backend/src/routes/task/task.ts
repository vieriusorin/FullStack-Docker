import express from 'express';
import { validateRequest, protectedRoute } from '../../middlewares';
import { taskValidator } from './schema';
import { create, readTasks, readTask, deleteTask, updateTask, readProjectTasks } from '../../handlers/task';

const router = express.Router();

router.post(
  '/api/tasks',
  protectedRoute,
  taskValidator,
  validateRequest,
  create
)

router.get(
  '/api/tasks',
  protectedRoute,
  validateRequest,
  readTasks
)

router.get(
  '/api/tasks/:id',
  protectedRoute,
  validateRequest,
  readTask
)

router.get(
  '/api/projects/:projectId/tasks',
  protectedRoute,
  validateRequest,
  readProjectTasks
)

router.patch(
  '/api/tasks/:id',
  protectedRoute,
  taskValidator,
  validateRequest,
  updateTask
)

router.delete(
  '/api/tasks/:id',
  protectedRoute,
  validateRequest,
  deleteTask
)

export { router as taskRouter }