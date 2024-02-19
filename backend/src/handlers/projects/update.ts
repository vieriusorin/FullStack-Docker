import { Request, Response } from 'express';
import prisma from '../../db';

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...req.body,
        userId: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
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