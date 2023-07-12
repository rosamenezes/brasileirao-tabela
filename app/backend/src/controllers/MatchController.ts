import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const { inProgress } = _req.query;
    const response = await this.matchService
      .getAllMatches(inProgress as string | undefined);
    return res.status(200).json(response);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.matchService.finishMatch(Number(id));
    return res.status(200).json(response);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const matchData = req.body;
    const response = await this.matchService
      .updateMatch(Number(id), matchData);
    return res.status(200).json(response);
  }

  public async createMatch(req: Request, res: Response) {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    } = req.body;

    const response = await this.matchService
      .createMatch(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
    return res.status(201).json(response.data);
  }
}
