import { CreationOptional, DataTypes, Model, Sequelize } from 'sequelize';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string | undefined;
  gender: string;
  hobbies: string;
  occupation: string;
  createdAt?: string;
}

export class UserDb extends Model<User> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare gender: string;
  declare hobbies: string;
  declare occupation: string;
  declare createdAt: CreationOptional<Date>;
}

export const user = (sequelize: Sequelize) => {
  UserDb.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      hobbies: {
        type: DataTypes.STRING,
      },
      occupation: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'users',
      sequelize,
    }
  );

  return UserDb;
};
