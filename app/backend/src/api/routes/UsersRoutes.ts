import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/index';
import { UserService } from '../services/index';
import validateToken from '../middleware/validateToken';

const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.post('/', (req:Request, res:Response) => userController.userLogin(req, res));
userRouter.get(
  '/role',
  validateToken,
  (req:Request, res:Response) => res.status(200).json({ role: res.locals.user.role }),
);

export default userRouter;
