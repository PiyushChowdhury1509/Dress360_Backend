import express, { Router, RequestHandler} from 'express'
import { UserSignup, UserSignin } from '../controllers/userAuth.controller'; 

const userRouter: Router = express.Router();

userRouter.post('/signup', UserSignup as RequestHandler);
userRouter.post('/signin', UserSignin as RequestHandler);

export default userRouter;