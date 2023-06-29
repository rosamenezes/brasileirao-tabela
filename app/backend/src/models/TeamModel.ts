import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamsModel from '../database/models/TeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamModel implements ITeamModel {
  private sequelizeModel = TeamsModel;

  async findAll(): Promise<ITeam[]> {
    const all = await this.sequelizeModel.findAll();
    return all;
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const byId = await this.sequelizeModel.findByPk(id);
    return byId;
  }
}
