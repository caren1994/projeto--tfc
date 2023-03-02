import { ModelStatic } from 'sequelize';
import LeaderRules from '../../utils/leaderRules';
import { IResults } from '../interfaces/IResults';
import Matche from '../../database/models/Matche';
import Team from '../../database/models/Team';
import IServiceLeader from '../interfaces/IServiceLeader';

export default class LeaderBoardService implements IServiceLeader {
  protected model: ModelStatic<Matche> = Matche;
  protected modelTeam: ModelStatic<Team> = Team;

  public async getResults(teamSide: string): Promise<IResults[]> {
    const matches = await this.model.findAll( // recupera todos os matche que nao estao em andamento
      { where: { inProgress: false } },
    );
    console.log(matches);
    const results = LeaderRules
      .createResult(await this.getAllTeams(), matches, teamSide);
    return results;// retorna o object desejado
  }

  async getAllTeams(): Promise<Team[]> {
    const resultTeams = await this.modelTeam.findAll();
    return resultTeams;// recupera todos os times
  }
}
