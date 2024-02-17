import { Request, Response, NextFunction } from 'express';
import { createJWT, hashPassword } from '../../modules/auth';

import prisma from '../../db';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const hash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
      }
    });

    const token = await createJWT(user);

    res.status(200).json({
      status: "success",
      token
    })
  } catch (e) {
    console.log(e);
    e.type = 'userExists';
    next(e)
  } finally {
    await prisma.$disconnect();
  }
}
