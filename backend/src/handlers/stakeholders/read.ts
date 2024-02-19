import { Request, Response } from 'express';
import prisma from '../../db';

export const readStakeholders = async (req: Request, res: Response) => {
  try {
    const { orderBy = 'desc', limit = 3, page = 1 } = req.query;

    const stakeholders = await prisma.stakeholder.findMany({
      take: limit ? Number(limit) : 1,
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: orderBy
      }
    });

    if (!stakeholders) {
      return res.status(404).json({
        status: 'error',
        message: 'No stakeholders found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        stakeholders,
        count: stakeholders.length
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  } finally {
    await prisma.$disconnect();
  }
}

export const readStakeholder = async (req: Request, res: Response) => {
  try {
    const stakeholder = await prisma.stakeholder.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!stakeholder) {
      return res.status(404).json({
        status: 'error',
        message: 'Stakeholder not found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: stakeholder
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