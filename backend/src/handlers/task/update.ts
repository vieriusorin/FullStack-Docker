import { Request, Response } from 'express';
import prisma from '../../db';
import * as bcrypt from 'bcrypt';

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, project, user } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        project,
        user,
      },
    });

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: task
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