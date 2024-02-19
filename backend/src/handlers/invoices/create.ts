import { Request, Response } from "express";
import prisma from "../../db";

const currentDate = new Date();
const twoWeeksLater = new Date(currentDate.getTime() + (14 * 24 * 60 * 60 * 1000)); // Add 14 days
export const create = async (req: Request, res: Response) => {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        ...req.body,
        dueDate: twoWeeksLater,
        userId: req.user.id,
      }
    });

    return res.status(201).json({
      status: 'success',
      data: invoice
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}