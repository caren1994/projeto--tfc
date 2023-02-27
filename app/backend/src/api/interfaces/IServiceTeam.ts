import Team from '../../database/models/Team';

export default interface IServiceTeam{
  readAll():Promise<Team[]>;
  readOne(id:number):Promise<Team | null>
}
