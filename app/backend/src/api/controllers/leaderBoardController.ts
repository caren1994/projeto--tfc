import { Request, Response } from 'express';
import IServiceLeader from '../interfaces/IServiceLeader';

export default class LeaderBoardController {
  private _service : IServiceLeader;
  constructor(service:IServiceLeader) {
    this._service = service;
  }

  public async resultsHome(_req: Request, res: Response): Promise<Response | void> {
    const result = await this._service.getResults('home');
    res.status(200).json(result);
  }

  public async resultsAway(_req: Request, res: Response): Promise<Response | void> {
    const result = await this._service.getResults('away');
    res.status(200).json(result);
  }
}
