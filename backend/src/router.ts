import { Router } from 'express';
import { signUp } from './handlers/auth';

const router = Router();

router.post('/sign-up', signUp)
export default router;