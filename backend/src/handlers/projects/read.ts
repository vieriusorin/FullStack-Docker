import { Request, Response } from 'express';
import prisma from '../../db';

export const readProjects = async (req: Request, res: Response) => {
  try {
    const { orderBy = 'desc', status, limit = 3, page = 1 } = req.query;

    const projects = await prisma.project.findMany({
      take: limit ? Number(limit) : 1,
      skip: (page - 1) * limit,
      where: {
        status
      },
      orderBy: {
        createdAt: orderBy
      }
    });

    if (!projects) {
      return res.status(404).json({
        status: 'error',
        message: 'No projects found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        projects,
        count: projects.length
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

export const readProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: project
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