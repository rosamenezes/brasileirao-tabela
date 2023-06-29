import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/StatusCode';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.teamService.findAll();
    return res.status(200).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.teamService.findById(Number(req.params.id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      const code = mapStatusHTTP(serviceResponse.status);
      return res.status(code).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
