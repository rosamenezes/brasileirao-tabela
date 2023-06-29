import { ITeam } from '../Interfaces/teams/ITeam';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) { }

  public async findAll() {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async findById(id: ITeam['id']) {
    const teamById = await this.teamModel.findById(id);
    if (!teamById) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    return { status: 'SUCCESSFUL', data: teamById };
  }
}
