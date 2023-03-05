import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';
import db from '../models';
import { User } from '../models/user.model';
const UserDb = db.user;

interface AuthResponse extends Omit<User, 'password'> {
  accessToken: string;
}

export const signUp = (req: Request, res: Response) => {
  let errorMessage = '';
  const { username, password, email, firstName, lastName, gender, hobbies, occupation } = req.body;

  if (!username) errorMessage = 'Username is required.';
  if (!password) errorMessage = 'Password is required.';
  if (!email) errorMessage = 'Email address is required.';
  if (!firstName) errorMessage = 'First name is required.';
  if (!lastName) errorMessage = 'Last name is required.';
  if (!gender) errorMessage = 'Gender is required.';
  if (!hobbies) errorMessage = 'Hobbies are required.';
  if (!occupation) errorMessage = 'Occupation is required.';

  if (errorMessage) return res.status(400).send({ message: errorMessage });

  UserDb.create({
    username,
    email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstName,
    lastName,
    gender,
    hobbies,
    occupation,
  })
    .then((user) => userResponseWithToken(user.dataValues, res))
    .catch((error) => {
      console.log('Error during sign up: ', error.message);
      return res.status(500).send({
        message: 'Sorry, something went wrong while trying to sign up. Please try again later.',
      });
    });
};

export const login = (req: Request, res: Response) => {
  if (!req.body.username) return res.status(400).send({ message: 'Username is required.' });
  if (!req.body.password) return res.status(400).send({ message: 'Password is required.' });

  UserDb.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `Sorry, we couldn't find your profile. Please check your username or register a new profile.`,
        });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password.',
        });
      }

      return userResponseWithToken(user.dataValues, res);
    })
    .catch((err) => {
      console.log('Error during login: ', err);
      return res.status(500).send({
        message: 'Sorry, something went wrong while trying to log in. Please try again later.',
      });
    });
};

function userResponseWithToken(user: User, res: Response) {
  const token = jwt.sign({ id: user.id }, authConfig.secret || '', {
    expiresIn: 86400, // 24 hours
  });

  const userResponse: AuthResponse = {
    id: user.id,
    username: user.username,
    email: user.email,
    accessToken: token,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    hobbies: user.hobbies,
    occupation: user.occupation,
    createdAt: user.createdAt,
  };

  return res.status(200).send(userResponse);
}
