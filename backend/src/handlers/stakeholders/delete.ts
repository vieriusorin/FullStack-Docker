import { Request, Response } from 'express';
import prisma from '../../db';

export const deleteStakeholder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stakeholder = await prisma.stakeholder.findUnique({
      where: { id },
    });

    if (!stakeholder) {
      return res.status(404).json({
        status: 'error',
        message: 'Stakeholder not found'
      })
    }

    await prisma.stakeholder.delete({
      where: { id }
    })

    res.status(200).json({
      status: 'success',
      message: 'Stakeholder deleted successfully'
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