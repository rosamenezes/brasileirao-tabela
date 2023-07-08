import { IUser } from './users/IUser';

export interface Token {
  generate(user: IUser): string
}
