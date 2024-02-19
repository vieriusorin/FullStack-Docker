import { Request, Response } from "express";
import prisma from "../../db";

export const create = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({
      data: {
        ...req.body,
        userId: req.user.id,
      }
    });

    return res.status(201).json({
      status: 'success',
      data: project
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}