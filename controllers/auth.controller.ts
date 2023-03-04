import { Request, Response } from 'express';
import { authConfig } from '../config/auth.config';
import db from '../models';
const User = db.user;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

export const signUp = (req: Request, res: Response) => {
  if (!req.body.username) {
    return res.status(400).send({ message: 'Missing username.' });
  }

  if (!req.body.password) {
    return res.status(400).send({ message: 'Password required.' });
  }

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    hobbies: req.body.hobbies,
    occupation: req.body.occupation,
  })
    .then((user) => {
      var token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
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
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

export const login = (req: Request, res: Response) => {
  if (!req.body.username) {
    return res.status(400).send({ message: 'Invalid username.' });
  }
  if (!req.body.password) {
    return res.status(400).send({ message: 'Password required.' });
  }

  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      var token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
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
      });
    })
    .catch((err) => {
      console.log('Error during login: ', err);
      res.status(500).send({ message: err.message });
    });
};