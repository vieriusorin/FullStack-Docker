import express from 'express';
import { validateRequest, protectedRoute } from '../../middlewares';
import { categoryValidator } from './schema';
import { create, update, readCategories, readCategory, deleteCategory } from '../../handlers/category';

const router = express.Router();

router.post(
  '/api/categories',
  protectedRoute,
  categoryValidator,
  validateRequest,
  create
)

router.get(
  '/api/categories',
  protectedRoute,
  validateRequest,
  readCategories
)

router.get(
  '/api/categories/:id',
  protectedRoute,
  validateRequest,
  readCategory
)

router.patch(
  '/api/categories/:id',
  protectedRoute,
  categoryValidator,
  validateRequest,
  update
)

router.delete(
  '/api/categories/:id',
  protectedRoute,
  validateRequest,
  deleteCategory
)

export { router as categoryRouter }