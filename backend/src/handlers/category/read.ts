import { Request, Response } from 'express';
import prisma from '../../db';

export const readCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({
      status: 'success',
      data: categories
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

export const readCategory = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
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