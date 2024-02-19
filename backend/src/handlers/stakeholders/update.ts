import { Request, Response } from 'express';
import prisma from '../../db';

export const updateStakeholder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stakeholder = await prisma.stakeholder.update({
      where: { id },
      data: {
        ...req.body
      },
    });

    if (!stakeholder) {
      return res.status(404).json({
        status: 'error',
        message: 'Stakeholder not found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: stakeholder
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