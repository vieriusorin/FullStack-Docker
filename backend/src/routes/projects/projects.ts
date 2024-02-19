import express from 'express';

import { validateRequest, protectedRoute, checkTokenMiddleware } from '../../middlewares';
import { create, deleteProject, updateProject, readProject, readProjects } from '../../handlers/projects';

const router = express.Router();

router.post(
  '/api/projects',
  protectedRoute,
  checkTokenMiddleware,
  validateRequest,
  create
)

router.get(
  '/api/projects',
  protectedRoute,
  validateRequest,
  readProjects
)

router.get(
  '/api/projects/:id',
  protectedRoute,
  validateRequest,
  readProject
)

router.patch(
  '/api/projects/:id',
  protectedRoute,
  checkTokenMiddleware,
  validateRequest,
  updateProject
)

router.delete(
  '/api/projects/:id',
  protectedRoute,
  validateRequest,
  deleteProject
)

export { router as projectRouter }