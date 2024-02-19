import { Request, Response } from 'express';
import prisma from '../../db';

export const readTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();

    if (!tasks) {
      return res.status(404).json({
        status: 'error',
        message: 'No tasks found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        tasks,
        count: tasks.length
      },
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

export const readTask = async (req: Request, res: Response) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: req.params.id
      }
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

export const readProjectTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        taskId: req.params.projectId
      }
    });

    if (!tasks) {
      return res.status(404).json({
        status: 'error',
        message: 'No tasks found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        tasks,
        count: tasks.length
      },
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
