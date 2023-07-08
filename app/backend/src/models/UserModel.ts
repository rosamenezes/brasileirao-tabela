import { IUserModel } from '../Interfaces/users/IUserModel';
import UsersModel from '../database/models/UserModel';
import { IUser } from '../Interfaces/users/IUser';

export default class UserModel implements IUserModel {
  private sequelizeModel = UsersModel;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.sequelizeModel.findOne({ where: { email } });
    return user;
  }

  async findRole(id: string): Promise<IUser | null> {
    const user = await this.sequelizeModel.findOne({ where: { id } });
    return user;
  }
}
