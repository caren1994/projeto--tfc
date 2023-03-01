import { ModelStatic, Op } from 'sequelize';
import Matche from '../../database/models/Matche';
import IServiceMatche from '../interfaces/IServiceMatche';
import Team from '../../database/models/Team';

class MatcheService implements IServiceMatche {
  protected model:ModelStatic <Matche> = Matche;

  async readAll(inProgress?: boolean): Promise<Matche[]> {
    if (inProgress === undefined) {
      const result = await this.model.findAll({
        include: [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ],
      });
      return result;
    }
    const result = await this.model.findAll(
      { include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { [Op.and]: [{ inProgress }] } }, // Sequelize inferiu que o chamador queria um ANDpara as duas verificações. O código acima é equivalente a:
    );
    return result;
  }

  async finish(id:number):Promise<number[] | undefined> {
    const result = await this.model.update({ inProgress: false }, { where: { id } });
    return result;
  }
}

export default MatcheService;
