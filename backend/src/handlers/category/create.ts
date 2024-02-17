import { Request, Response } from 'express';
import prisma from '../../db';

export const create = async (req: Request, res: Response) => {

  try {
    const { title, description } = req.body;

    const category = await prisma.category.create({
      data: {
        title,
        description
      },
    });
    res.status(201).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  } finally {
    await prisma.$disconnect();
  }
}