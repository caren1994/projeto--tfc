import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

class TeamController {
  private _service:IServiceTeam;
  constructor(service:IServiceTeam) {
    this._service = service;
  }

  public async readAll(_req:Request, res:Response):Promise<Response | void> {
    const result = await this._service.readAll();
    res.status(200).json(result);
  }

  public async readOne(req:Request, res:Response):Promise<Response | void> {
    const result = await this._service.readOne(Number(req.params.id));
    res.status(200).json(result);
  }
}
export default TeamController;
