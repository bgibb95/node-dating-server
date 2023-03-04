import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/db.config';
import { user } from './user.model';

const sequelize = new Sequelize(dbConfig.DB || '', dbConfig.USER || '', dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {
  Sequelize,
  sequelize,
  user: user(sequelize),
};

export default db;
