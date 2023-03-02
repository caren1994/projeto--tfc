import { Request, Response, Router } from 'express';
import { LeaderBoardController } from '../controllers';
import { LeaderBoardService } from '../services';

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.resultsHome(req, res),
);

leaderBoardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.resultsAway(req, res),
);

export default leaderBoardRouter;
