import { Request, Response } from 'express';
import IServiceMatche from '../interfaces/IServiceMatche';

class MatcheController {
  private _service:IServiceMatche;
  constructor(service:IServiceMatche) {
    this._service = service;
  }

  public async readAll(req:Request, res:Response):Promise <Response | void> {
    const result = await this._service.readAll();
    res.status(200).json(result);
  }
}
export default MatcheController;
