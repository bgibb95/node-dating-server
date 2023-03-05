import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  secret: process.env.JWT_PRIVATE_KEY,
};
