import { Request, Response } from 'express';
import prisma from '../../db';

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });

    if (!invoice) {
      return res.status(404).json({
        status: 'error',
        message: 'Invoice not found'
      })
    }

    await prisma.invoice.delete({
      where: { id }
    })

    res.status(200).json({
      status: 'success',
      message: 'Invoice deleted successfully'
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