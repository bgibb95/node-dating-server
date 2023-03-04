import { NextFunction, Request, Response } from 'express';
import db from '../models';
const User = db.user;

export const checkDuplicateUsernameOrEmail = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.username) {
    return res.status(400).send({
      message: 'Missing username!',
    });
  }

  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Username is already in use!',
        });
        return;
      }

      // Email
      User.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((user) => {
          if (user) {
            res.status(400).send({
              message: 'Failed! Email is already in use!',
            });
            return;
          }

          next();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// const verifySignUp = {
//   checkDuplicateUsernameOrEmail,
// };

export default {
  checkDuplicateUsernameOrEmail,
};
