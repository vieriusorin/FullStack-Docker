import { Request, Response } from 'express';
import prisma from '../../db';
import { comparePasswords, createJWT } from '../../modules/auth';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    });

    const isValid = await comparePasswords(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    const token = await createJWT(user);

    res.status(200).json({
      status: 'success',
      token
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
}