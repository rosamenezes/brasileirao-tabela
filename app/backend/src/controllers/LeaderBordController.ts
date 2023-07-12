import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBordService';

export default class LeaderBoardController {
  static async boardHome(_req: Request, res: Response) {
    const response = await LeaderBoardService.getHome();

    res.status(200).json(response);
  }

  static async boardAway(_req: Request, res: Response) {
    const response = await LeaderBoardService.getAway();

    res.status(200).json(response);
  }
}
