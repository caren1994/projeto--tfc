import Team from '../../database/models/Team';
import { IResults } from './IResults';

export default interface IServiceLeader{
  getResults(teamSide:string):Promise<IResults[]>;
  getAllTeams():Promise<Team[]>;
}
