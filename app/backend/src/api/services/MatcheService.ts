import { ModelStatic, Op } from 'sequelize';
import Matche from '../../database/models/Matche';
import IServiceMatche from '../interfaces/IServiceMatche';
import Team from '../../database/models/Team';
import IBodyMatche from '../interfaces/IBodyMatche';
import IBodyCreateMatche from '../interfaces/IBodyCreateMatche';
import ErrorMatche from '../../utils/ErrorMatche';

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

  async updateMatche(id: number, body: IBodyMatche): Promise<number[] | undefined> {
    const result = await this.model.update({ homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals }, { where: { id } });
    return result;
  }

  async createMatche(
    { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }
    :IBodyCreateMatche,
  ): Promise<Matche> {
    try {
      if (homeTeamId === awayTeamId) {
        throw new ErrorMatche('It is not possible to create a match with two equal teams', 422);
      }
      const result = await this.model.create(
        { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
      );
      return result;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
}

export default MatcheService;
