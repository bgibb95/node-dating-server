import bcrypt from 'bcryptjs';
import { User, UserDb as UserDbClass } from '../models/user.model';

const dummyUser: User = {
  username: 'JohnCoolGuy',
  email: 'john@gmail.com',
  password: 'Password1234#',
  firstName: 'John',
  lastName: 'Smith',
  gender: 'Male',
  hobbies: 'Walking, jogging, hiking',
  occupation: 'Accountant',
};

export const seedDb = async (UserDb: typeof UserDbClass) => {
  const dummyUsers: User[] = Array(20).fill(dummyUser);

  dummyUsers.forEach(async (user, index) => {
    try {
      await UserDb.create({
        username: user.username + index,
        email: index + user.email,
        password: bcrypt.hashSync(user.password || '', 8),
        firstName: user.firstName + index,
        lastName: user.lastName + index,
        gender: user.gender,
        hobbies: user.hobbies,
        occupation: user.occupation,
      });
    } catch (error) {
      console.log('Error seeding database with dummy users: ', error);
    }
  });
};
