import { IUserModel } from '../Interfaces/users/IUserModel';
import { Encrypter } from '../Interfaces/Encrypter';
import { Token } from '../Interfaces/Token';

export default class UserService {
  constructor(
    private userModel: IUserModel,
    private encrypter: Encrypter,
    private tokenGenerator: Token,
  ) { }

  public async login(email: string, password: string) {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const isValidPass = await this.encrypter.compare(password, user.password);
    if (!isValidPass) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = this.tokenGenerator.generate(user);
    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }
}
