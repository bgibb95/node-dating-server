import { Request, Response } from 'express';
import db from '../models';
const UserDb = db.user;

export const allUsers = (req: Request, res: Response) => {
  UserDb.findAll()
    .then((users) => {
      const cleanedUsers = users?.map((user) => {
        const { username, email, firstName, lastName, gender, hobbies, occupation, createdAt } =
          user.dataValues;
        return { username, email, firstName, lastName, gender, hobbies, occupation, createdAt };
      });

      res.status(200).send({ users: cleanedUsers });
    })
    .catch((error) => {
      console.log('Error fetching all users: ', error.message);
      res.status(500).send({
        message:
          'Sorry, something went wrong while fetching all the people looking for love. Please try again later.',
      });
    });
};

export const userProfile = (req: Request, res: Response) => {
  UserDb.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) return res.status(200).send({ user: null });
      const { username, email, firstName, lastName, gender, hobbies, occupation, createdAt } =
        user.dataValues;

      const cleanedUser = {
        username,
        email,
        firstName,
        lastName,
        gender,
        hobbies,
        occupation,
        createdAt,
      };

      res.status(200).send({ user: cleanedUser });
    })
    .catch((error) => {
      console.log('Error fetching user profile: ', error.message);
      res.status(500).send({
        message:
          'Sorry, something went wrong while fetching the dating profile. Please try again later.',
      });
    });
};
