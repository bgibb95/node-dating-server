import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

// order of InferAttributes & InferCreationAttributes is important.
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
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
  User.init(
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

  return User;
};
