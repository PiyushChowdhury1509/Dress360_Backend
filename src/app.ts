import 'dotenv/config'
import express, {Express, Request, Response, NextFunction} from 'express'
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import connectDB from './config/connectDB';

const PORT = process.env.PORT || 4000;

const app:Express = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

import userRouter from './routes/user.routes';
import productRouter from './routes/product.routes';
import cartRouter from './routes/cart.routes';

app.use('/api/v1/user',userRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/cart',cartRouter);

app.use('/', (err: Error, req: Request,res: Response,next: NextFunction) => {
    console.log(err);
    res.status(500).json({
        success: false,
        message: "internal server error"
    })
    return;
})

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log("server is listening on PORT",PORT);
    })
})
