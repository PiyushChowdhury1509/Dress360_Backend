import express, { Router, RequestHandler} from 'express'
import { UserSignup } from '../controllers/userAuth.controller'; 

const userRouter: Router = express.Router();

userRouter.post('/signup', UserSignup as RequestHandler);

export default userRouter;