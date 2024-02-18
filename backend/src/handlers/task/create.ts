import { Request, Response } from "express";
import prisma from "../../db";

import * as bcrypt from 'bcrypt';

export const create = async (req: Request, res: Response) => {
  try {
    const { title, description, project } = req.body;
    // const userId = req.user.id;

    console.log(req.user);

    const category = await prisma.task.create({
      data: {
        title,
        description,
        project
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