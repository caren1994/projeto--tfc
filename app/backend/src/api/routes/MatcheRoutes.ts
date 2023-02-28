import { Request, Response, Router } from 'express';
import { MatcheController } from '../controllers/index';
import { MatcheService } from '../services/index';

const matcheRouter = Router();
const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

matcheRouter.get('/', (req:Request, res:Response) => matcheController.readAll(req, res));

export default matcheRouter;
