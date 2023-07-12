import { homeRes, awayRes, teamsClassify } from './LeaderBordCalculator';
import { ITeam } from '../Interfaces/teams/ITeam';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';

export default class LeaderBoardService {
  static async getAway() {
    const teams = await TeamModel.findAll() as ITeam[];
    const awayTeams = teams.map(async (team) => {
      const matches = await MatchesModel.findAll({
        where: { awayTeamId: team.id, inProgress: false } });
      const stats = matches.map((match) => (
        awayRes(team.teamName, [match])
      ));
      const teamsStats = stats[matches.length - 1];
      return { ...teamsStats };
    });
    const results = await Promise.all(awayTeams);
    const Results = teamsClassify(results);
    return Results;
  }

  static async getHome() {
    const teams = await TeamModel.findAll();
    const homeTeams = teams.map(async (team) => {
      const matches = await MatchesModel.findAll({
        where: { homeTeamId: team.id, inProgress: false } });
      const stats = matches.map((match) => (
        homeRes(team.teamName, [match])
      ));
      const teamsStats = stats[matches.length - 1];
      return { ...teamsStats };
    });
    const results = await Promise.all(homeTeams);
    const Results = teamsClassify(results);
    return Results;
  }
}
