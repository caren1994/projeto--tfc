import { Request, Response, Router } from 'express';
import { MatcheController } from '../controllers/index';
import validateToken from '../middleware/validateToken';
import { MatcheService } from '../services/index';

const matcheRouter = Router();
const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

matcheRouter.get('/', (req:Request, res:Response) => matcheController.readAll(req, res));
matcheRouter.patch(
  '/:id/finish',
  validateToken,
  (req:Request, res:Response) => matcheController.finish(req, res),
);

export default matcheRouter;
