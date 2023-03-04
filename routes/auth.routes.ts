import { Express } from 'express';
import { login, signUp } from '../controllers/auth.controller';
import { checkDuplicateUsernameOrEmail } from '../middleware/verify-sign-up.middleware';

export const authRoutes = (app: Express) => {
  app.use((_, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.post('/api/1/signup', [checkDuplicateUsernameOrEmail], signUp);
  app.post('/api/1/signin', login);
};
