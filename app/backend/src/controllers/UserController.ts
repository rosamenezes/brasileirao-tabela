import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/StatusCode';
import UserModel from '../models/UserModel';

export default class UserController {
  constructor(
    private userService: UserService,
    private userModel: UserModel,
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.login(email, password);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      const code = mapStatusHTTP(serviceResponse.status);
      return res.status(code).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response) {
    const userId = await this.userModel.findRole(res.locals.user.id);
    res.status(200).json({ role: userId?.role });
  }
}
