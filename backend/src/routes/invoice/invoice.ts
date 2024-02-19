import express from 'express';

import { validateRequest, protectedRoute, checkTokenMiddleware } from '../../middlewares';
import { create, deleteInvoice, updateInvoice, readInvoices, readInvoice } from '../../handlers/invoices';
import { invoiceValidator } from './schema';

const router = express.Router();

router.post(
  '/api/invoices',
  protectedRoute,
  checkTokenMiddleware,
  invoiceValidator,
  validateRequest,
  create
)

router.get(
  '/api/invoices',
  protectedRoute,
  validateRequest,
  readInvoices
)

router.get(
  '/api/invoices/:id',
  protectedRoute,
  validateRequest,
  readInvoice
)

router.patch(
  '/api/invoices/:id',
  protectedRoute,
  checkTokenMiddleware,
  validateRequest,
  updateInvoice
)

router.delete(
  '/api/invoices/:id',
  protectedRoute,
  validateRequest,
  deleteInvoice
)

export { router as invoiceRouter }