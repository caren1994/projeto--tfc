import User from '../../database/models/User';
import IUser from './IUser';

export default interface IServiceTeam{
  userLogin(user:IUser):Promise<User | null>;

}
