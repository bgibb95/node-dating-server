import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token as string, authConfig.secret || '', (err) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

export default authJwt;
