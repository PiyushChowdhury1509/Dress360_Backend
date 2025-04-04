import { createCart } from '../controllers/cart.controller';
import express, { Router, RequestHandler} from 'express'


const cartRouter: Router = express.Router();

cartRouter.post('/createCart',createCart as RequestHandler);

export default cartRouter;