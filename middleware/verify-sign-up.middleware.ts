import { NextFunction, Request, Response } from 'express';
import db from '../models';
const UserDb = db.user;

export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.username) {
    return res.status(400).send({
      message: 'Username is required.',
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: 'Email address is required.',
    });
  }

  try {
    // Find user with same username
    const user = await UserDb.findOne({ where: { username: req.body.username } });

    if (user) {
      return res.status(400).send({
        message: 'Failed. Username is already in use.',
      });
    }

    try {
      // Find user with same email
      const user = await UserDb.findOne({ where: { email: req.body.email } });

      if (user) {
        res.status(400).send({
          message: 'Failed. Email is already in use.',
        });
        return;
      }

      next();
    } catch (error) {
      console.log('Error while checking if email is already in  use:', error);
      res.status(500).send({
        message:
          'Sorry, something went wrong while before creating the dating profile. Please try again later.',
      });
    }
  } catch (error) {
    console.log('Error while checking if username is already in  use:', error);
    res.status(500).send({
      message:
        'Sorry, something went wrong while before creating the dating profile. Please try again later.',
    });
  }
};
