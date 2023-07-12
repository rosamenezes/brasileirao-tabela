import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class UserModel extends Model<InferAttributes<UserModel>,
InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare username: CreationOptional<string>;
  declare role: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare password: CreationOptional<string>;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    field: 'username',
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  role: {
    field: 'role',
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  password: {
    field: 'password',
    type: DataTypes.STRING(30),
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

export default UserModel;
