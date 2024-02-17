import { Request, Response, } from 'express';
import prisma from '../../db';

export const users = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      status: 'success',
      data: users
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