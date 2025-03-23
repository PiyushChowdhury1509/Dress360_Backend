import express, { Router, RequestHandler} from 'express'
import { UserSignup, UserSignin, UserLogout, SendVerifyOtp } from '../controllers/userAuth.controller'; 

const userRouter: Router = express.Router();

userRouter.post('/signup', UserSignup as RequestHandler);
userRouter.post('/signin', UserSignin as RequestHandler);
userRouter.post('/logout', UserLogout as RequestHandler);
userRouter.post('/sendVerifyOtp', SendVerifyOtp as RequestHandler);

export default userRouter;