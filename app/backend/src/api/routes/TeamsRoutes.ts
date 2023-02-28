import { Router, Request, Response } from 'express';
import { TeamService } from '../services/index';
import { TeamController } from '../controllers/index';

const teamRouter = Router();
const teamsService = new TeamService();
const teamController = new TeamController(teamsService);
teamRouter.get('/', (req:Request, res:Response) => teamController.readAll(req, res));
teamRouter.get('/:id', (req:Request, res:Response) => teamController.readOne(req, res));

export default teamRouter;
