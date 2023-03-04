import { Request, Response } from 'express';
import db from '../models';
const User = db.user;

export const allAccess = (req: Request, res: Response) => {
  User.findAll()
    .then((users) => {
      const cleanedUsers = users?.map((user) => {
        const { username, email, firstName, lastName, gender, hobbies, occupation, createdAt } =
          user.dataValues;
        return { username, email, firstName, lastName, gender, hobbies, occupation, createdAt };
      });

      res.status(200).send({ users: cleanedUsers });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const userProfile = (req: Request, res: Response) => {
  User.findOne({
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
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
