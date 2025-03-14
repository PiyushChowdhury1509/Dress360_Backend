import 'dotenv/config'
import express, {Express, Request, Response, NextFunction} from 'express'
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import connectDB from './config/connectDB';

const PORT = process.env.PORT || 4000;

const app:Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(compression());

import userRouter from './routes/user.routes';

app.use('/user',userRouter);

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
