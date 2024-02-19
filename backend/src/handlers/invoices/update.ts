import { Request, Response } from 'express';
import prisma from '../../db';

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.update({
      where: { id },
      data: {
        ...req.body,
        userId: req.user.id,
      },
    });

    if (!invoice) {
      return res.status(404).json({
        status: 'error',
        message: 'Invoice not found'
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