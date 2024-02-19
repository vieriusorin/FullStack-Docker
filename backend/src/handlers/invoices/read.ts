import { Request, Response } from 'express';
import prisma from '../../db';

export const readInvoices = async (req: Request, res: Response) => {
  try {
    const { orderBy = 'desc', status, limit = 3, page = 1 } = req.query;

    const invoices = await prisma.invoice.findMany({
      take: limit ? Number(limit) : 1,
      skip: (page - 1) * limit,
      where: {
        status
      },
      orderBy: {
        createdAt: orderBy
      }
    });

    if (!invoices) {
      return res.status(404).json({
        status: 'error',
        message: 'No invoices found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        invoices,
        count: invoices.length
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  } finally {
    await prisma.$disconnect();
  }
}

export const readInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!invoice) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: invoice
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  } finally {
    await prisma.$disconnect();
  }
}