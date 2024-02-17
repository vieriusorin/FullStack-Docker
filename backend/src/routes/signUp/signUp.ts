import express from 'express';
import { signUpLimiter } from '../../middlewares';
import { signUpSchema } from './schema';
import { validateRequest } from '../../middlewares/validate-request';
import { signUp } from '../../handlers/auth';

const router = express.Router();

router.post(
  '/api/sign-up',
  signUpLimiter,
  signUpSchema,
  validateRequest,
  signUp
)

export { router as signUpRouter }