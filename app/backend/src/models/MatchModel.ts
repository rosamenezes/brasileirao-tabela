import MatchesModel from '../database/models/MatchesModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import TeamModel from '../database/models/TeamModel';

export default class MatchModel {
  private model = MatchesModel;

  types = [
    {
      model: TeamModel,
      as: 'homeTeam',
      attributes: [
        'teamName',
      ],
    },
    {
      model: TeamModel,
      as: 'awayTeam',
      attributes: [
        'teamName',
      ],
    },
  ];

  async findAllMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({ include: this.types });
    return matches;
  }

  async findProgressMatches(progress: boolean): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      where: { inProgress: progress },
      include: this.types,
    });
    return matches;
  }

  async finishMatch(matchId: number) {
    const match = await this.model.update(
      { inProgress: false },
      { where: { id: matchId } },
    );
    return match;
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const match = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  }

  async updateMatch(matchId: number, matchData: IMatches) {
    const match = await this.model.update(
      { ...matchData },
      { where: { id: matchId } },
    );
    return match;
  }
}
