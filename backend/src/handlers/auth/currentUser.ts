import { Response, Request } from 'express';

export const currentUser = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: req.user
  })
}