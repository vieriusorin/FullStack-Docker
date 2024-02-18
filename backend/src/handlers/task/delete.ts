import { Request, Response } from 'express';
import prisma from '../../db';

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      })
    }

    await prisma.task.delete({
      where: { id }
    })

    res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully'
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