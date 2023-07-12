import MatchModel from '../models/MatchModel';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) { }

  public async getAllMatches(progress: string | undefined): Promise<IMatches[]> {
    if (progress !== undefined) {
      const inProgress = progress === 'true';
      const allMatchesInProgress = await this.matchModel.findProgressMatches(inProgress);
      return allMatchesInProgress;
    }
    const allMatches = await this.matchModel.findAllMatches();
    return allMatches;
  }

  public async finishMatch(id: number) {
    await this.matchModel.finishMatch(id);
    return { message: 'Finished' };
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const match = await this.matchModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return {
      message: 'Created',
      data: match,
    };
  }

  public async updateMatch(id: number, matchData: IMatches) {
    await this.matchModel.updateMatch(id, matchData);
    return { message: 'Updated' };
  }
}
