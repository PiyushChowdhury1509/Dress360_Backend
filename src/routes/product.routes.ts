import express, { Router, RequestHandler} from 'express'
import { createProduct,getProductFeed } from '../controllers/product.controller';

const productRouter: Router = express.Router();

productRouter.post('/createProduct',createProduct as RequestHandler);
productRouter.get('/productFeed',getProductFeed as RequestHandler);

export default productRouter;