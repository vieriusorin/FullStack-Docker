import express from 'express';
import { validateRequest, protectedRoute } from '../../middlewares';
import { detail, update, users, deleteUser } from '../../handlers/users';
import { userUpdateValidator } from './schema';
import { currentUser } from '../../handlers/auth/currentUser';

const router = express.Router();

router.get(
  '/api/users',
  protectedRoute,
  validateRequest,
  users
)

router.get(
  '/api/users/:id',
  protectedRoute,
  validateRequest,
  detail
)

router.get(
  '/api/current-user',
  protectedRoute,
  validateRequest,
  currentUser
)

router.patch(
  '/api/users/:id',
  protectedRoute,
  validateRequest,
  userUpdateValidator,
  update
)

router.delete(
  '/api/users/:id',
  validateRequest,
  deleteUser
)

export { router as usersRouter }