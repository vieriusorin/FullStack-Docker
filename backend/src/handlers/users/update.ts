import { Request, Response } from 'express';
import prisma from '../../db';

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, position, username } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        position,
        username,
      },
    });

    res.status(201).json({
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