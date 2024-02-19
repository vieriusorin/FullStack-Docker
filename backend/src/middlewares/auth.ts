import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  const token = jwt.sign({
    id: user.id,
    name: user.name,
  }, process.env.JWT_SECRET as string);

  return token;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.user = payload;
    next();
  } catch (error) {
    res.status(401);
    res.send("Not authorized");
    return;
  }
}