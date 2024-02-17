import express from 'express';
import { signIn } from '../../../handlers/auth';
import { signInLimiter } from '../../../middlewares';
import { validateRequest } from '../../../middlewares/validate-request';
import { signInSchema } from './schema';

const router = express.Router();

router.post(
  '/api/sign-in',
  signInLimiter,
  signInSchema,
  validateRequest,
  signIn
);

export { router as signInRouter }