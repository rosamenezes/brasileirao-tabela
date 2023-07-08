import * as jwt from 'jsonwebtoken';
import { Token } from '../Interfaces/Token';
import { IUser } from '../Interfaces/users/IUser';

export default class TokenGenerator implements Token {
  private jwt = jwt;
  private secret = 'jwt_secret';

  generate(user: IUser): string {
    const token = this.jwt.sign({ id: user.id }, this.secret);

    return token;
  }
}
