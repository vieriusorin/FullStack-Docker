import { Request, Response } from 'express';
import prisma from '../../db';

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      })
    }

    await prisma.project.delete({
      where: { id }
    })

    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully'
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