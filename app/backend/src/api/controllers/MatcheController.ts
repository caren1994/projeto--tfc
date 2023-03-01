import { Request, Response } from 'express';
import IServiceMatche from '../interfaces/IServiceMatche';

class MatcheController {
  private _service:IServiceMatche;
  constructor(service:IServiceMatche) {
    this._service = service;
  }

  public async readAll(req:Request, res:Response):Promise <Response | void> {
    const { inProgress } = req.query;// vem uma string
    if (inProgress === undefined) {
      const result = await this._service.readAll();
      return res.status(200).json(result);
    }

    const result = await this._service.readAll(inProgress === 'true');// faço a comparação da strings que vai me retornar um true ou false
    res.status(200).json(result);
  }

  public async finish(req:Request, res:Response):Promise<Response | void > {
    const { id } = req.params;
    const result = await this._service.finish(+id);
    return res.status(200).json(result);
  }
}
export default MatcheController;
