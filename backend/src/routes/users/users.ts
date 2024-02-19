import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import { detail, update, users, deleteUser } from '../../handlers/users';
import { userUpdateValidator } from './schema';
import { currentUser } from '../../handlers/auth/currentUser';
import { authMiddleware } from '../../middlewares';

const router = express.Router();

router.get(
  '/api/users',
  authMiddleware,
  validateRequest,
  users
)

router.get(
  '/api/users/:id',
  authMiddleware,
  validateRequest,
  detail
)

router.get(
  '/api/current-user',
  authMiddleware,
  validateRequest,
  currentUser
)

router.patch(
  '/api/users/:id',
  authMiddleware,
  validateRequest,
  userUpdateValidator,
  update
)

router.delete(
  '/api/users/:id',
  authMiddleware,
  validateRequest,
  deleteUser
)

export { router as usersRouter }