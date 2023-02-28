import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Matche extends Model {
  declare readonly id:number;
  declare homeTeamId:number;
  declare awayTeamId:number;
  declare homeTeamGoals:number;
  declare awayTeamGoals:number;
  declare inProgress:boolean;
}

Matche.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,

  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Matche',
  tableName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matche.belongsTo(Team, { foreignKey: 'homeTeaamId', as: 'homeTeam' });
Matche.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matche;
