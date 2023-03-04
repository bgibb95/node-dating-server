import { login, signUp } from '../controllers/auth.controller';
// import verifySignUp from '../middleware';

import { Express } from 'express';
import { checkDuplicateUsernameOrEmail } from '../middleware/verify-sign-up.middleware';

export const authRoutes = (app: Express) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.post('/api/auth/signup', [checkDuplicateUsernameOrEmail], signUp);
  app.post('/api/auth/signin', login);
};
