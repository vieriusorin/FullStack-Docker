import express from 'express';
import { validateRequest } from '../../middlewares/validate-request';
import { categoryValidator } from './schema';
import { create, update, readCategories, readCategory, deleteCategory } from '../../handlers/category';

const router = express.Router();

router.post(
  '/api/categories',
  categoryValidator,
  validateRequest,
  create
)

router.get(
  '/api/categories',
  validateRequest,
  readCategories
)

router.get(
  '/api/categories/:id',
  validateRequest,
  readCategory
)

router.patch(
  '/api/categories/:id',
  categoryValidator,
  validateRequest,
  update
)

router.delete(
  '/api/categories/:id',
  validateRequest,
  deleteCategory
)

export { router as categoryRouter }