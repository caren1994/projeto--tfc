import { Router, Request, Response } from 'express';
import TeamService from '../services/index';
import TeamController from '../controllers/index';

const teamsRouter = Router();
const teamsService = new TeamService();
const teamController = new TeamController(teamsService);
teamsRouter.get('/', (req:Request, res:Response) => teamController.readAll(req, res));
teamsRouter.get('/:id', (req:Request, res:Response) => teamController.readOne(req, res));

export default teamsRouter;
