import { Request, Response } from "express";
import prisma from "../../db";

export const create = async (req: Request, res: Response) => {
  try {
    const category = await prisma.task.create({
      data: {
        ...req.body
      },
    });

    return res.status(201).json({
      status: 'success',
      data: category
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}