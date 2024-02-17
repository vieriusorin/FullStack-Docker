import { Request, Response } from 'express';
import prisma from '../../db';

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        title,
        description
      },
    });

    res.status(201).json({
      status: 'success',
      data: category
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