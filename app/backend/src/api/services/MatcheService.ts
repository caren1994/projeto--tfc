import { ModelStatic } from 'sequelize';
import Matche from '../../database/models/Matche';
import IServiceMatche from '../interfaces/IServiceMatche';
import Team from '../../database/models/Team';

class MatcheService implements IServiceMatche {
  protected model:ModelStatic <Matche> = Matche;
  async readAll():Promise<Matche[]> {
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return result;
  }
}

export default MatcheService;
