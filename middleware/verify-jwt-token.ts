import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'You be logged in in order to continue. Please log in first.',
    });
  }

  jwt.verify(token as string, authConfig.secret || '', (err, decoded) => {
    const decodedToken = decoded as
      | {
          id: number;
          iat: number;
          exp: number;
        }
      | undefined;
    if (decodedToken?.id) res.locals.decodedUserId = decodedToken?.id;

    if (err) {
      return res.status(401).send({
        message: `Sorry, we weren't able to verify you. Please try log in again or try again later.`,
      });
    }
    next();
  });
};
