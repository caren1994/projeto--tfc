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
    await this._service.finish(+id);
    return res.status(200).json({ mensagem: 'Finished' });
  }

  public async updateMatche(req:Request, res:Response):Promise<Response | void> {
    const { id } = req.params;
    await this._service.updateMatche(+id, req.body);
    return res.status(200).json({ mensagem: 'Placar Alterado' });
  }

  public async createMatche(req:Request, res:Response):Promise<Response | void> {
    try {
      const result = await this._service.createMatche(req.body);
      res.status(201).json(result);
    } catch (err) {
      const error = err as Error;
      if (error.message !== 'It is not possible to create a match with two equal teams') {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      res.status(422).json({ message: error.message });
    }
  }
}
export default MatcheController;
