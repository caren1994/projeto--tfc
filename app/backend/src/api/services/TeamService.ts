import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import IServiceTeam from '../interfaces/IServiceTeam';

class TeamService implements IServiceTeam {
  protected model : ModelStatic < Team > = Team;
  public async readAll(): Promise<Team[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async readOne(): Promise<Team | null> {
    const result = await this.model.findByPk();
    return result;
  }
}
export default TeamService;
