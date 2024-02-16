import { Request, Response } from 'express';
import prisma from '../../db';
import { comparePasswords, createJWT } from '../../modules/auth';

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  const isValid = await comparePasswords(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = await createJWT(user);
  res.status(200).json({
    status: 'success',
    token
  });
}