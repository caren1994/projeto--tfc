import { Request, Response } from 'express';
import { tokenGenerate } from '../../utils/token';

import IServiceUser from '../interfaces/IServiceUser';

const errorMessage = 'Invalid email or password';

class UserController {
  private _service:IServiceUser;
  constructor(service :IServiceUser) {
    this._service = service;
  }

  public async userLogin(req:Request, res:Response):Promise<Response | void> {
    try {
      const result = await this._service.userLogin(req.body);
      if (result === null) return res.status(401).json({ message: errorMessage });
      const token = tokenGenerate(result);
      res.status(200).json({ token });
    } catch (error) {
      const err = error as Error;
      if (err.message === errorMessage) {
        return res.status(401).json({ message: errorMessage });
      }
      res.status(400).json({ message: err.message });
    }
  }
}
export default UserController;
