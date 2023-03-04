import { Express } from 'express';
import { allUsers, userProfile } from '../controllers/user.controller';
import { verifyToken } from '../middleware/verify-jwt-token';

export const userRoutes = (app: Express) => {
  app.use((_, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/1/all-users', [verifyToken], allUsers);
  app.post('/api/1/user-profile', [verifyToken], userProfile);
};
