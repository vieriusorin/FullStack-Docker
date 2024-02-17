import { Request, Response } from 'express';
import prisma from '../../db';

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    if (user.role !== 'ADMIN') {
      res.status(401).json({
        status: 'error',
        message: 'Unauthorized to delete this user',
      })
    }

    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });


  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
  finally {
    await prisma.$disconnect();
  }
}