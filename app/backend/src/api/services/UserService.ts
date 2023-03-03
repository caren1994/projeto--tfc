import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../../database/models/User';
import IServiceUser from '../interfaces/IServiceUser';
import IUser from '../interfaces/IUser';
import validateLogin from './validation/schema';

class UserService implements IServiceUser {
  protected model:ModelStatic<User> = User;
  public async userLogin(user:IUser): Promise<User | null> {
    try {
      validateLogin(user);
      const result = await this.model.findOne(
        { where: { email: user.email } },
      );
      const validatePass = bcrypt.compareSync(user.password, result?.password || '-');
      return validatePass ? result?.dataValues : null;//
    } catch (error) {
      const err = error as Error;
      throw new Error(`${err.message}`);
    }
  }
}
export default UserService;
