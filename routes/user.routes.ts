import { Express } from 'express';
import { allAccess, userProfile } from '../controllers/user.controller';
import authJwt from '../middleware';

export const userRoutes = (app: Express) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/test/all', allAccess);
  app.post('/api/test/user-profile', [authJwt.authJwt.verifyToken], userProfile);
};
