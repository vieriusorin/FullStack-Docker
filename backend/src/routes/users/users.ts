import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import { detail, update, users, deleteUser } from '../../handlers/users';
import { userUpdateValidator } from './schema';
import { currentUser } from '../../handlers/auth/currentUser';

const router = express.Router();

router.get(
  '/api/users',
  validateRequest,
  users
)

router.get(
  '/api/users/:id',
  validateRequest,
  detail
)

router.get(
  '/api/current-user',
  validateRequest,
  currentUser
)

router.patch(
  '/api/users/:id',
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