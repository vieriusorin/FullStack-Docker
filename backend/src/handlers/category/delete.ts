import { Request, Response } from 'express';
import prisma from '../../db';

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found'
      })
    }

    await prisma.category.delete({
      where: { id }
    })

    res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully'
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