import express from 'express';

import { validateRequest, protectedRoute, checkTokenMiddleware } from '../../middlewares';
import { create, deleteStakeholder, updateStakeholder, readStakeholders, readStakeholder, readProjectStakeholders } from '../../handlers/stakeholders';

const router = express.Router();

router.post(
  '/api/stakeholders',
  protectedRoute,
  checkTokenMiddleware,
  validateRequest,
  create
)

router.get(
  '/api/stakeholders',
  protectedRoute,
  validateRequest,
  readStakeholders
)

router.get(
  '/api/projects/:projectId/stakeholders',
  protectedRoute,
  validateRequest,
  readProjectStakeholders
)

router.get(
  '/api/stakeholders/:id',
  protectedRoute,
  validateRequest,
  readStakeholder
)

router.patch(
  '/api/stakeholders/:id',
  protectedRoute,
  checkTokenMiddleware,
  validateRequest,
  updateStakeholder
)

router.delete(
  '/api/stakeholders/:id',
  protectedRoute,
  validateRequest,
  deleteStakeholder
)

export { router as stakeholderRouter }