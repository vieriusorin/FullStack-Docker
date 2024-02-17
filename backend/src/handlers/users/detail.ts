import { Request, Response } from 'express';
import prisma from '../../db';

export const detail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      user
    })


  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
}