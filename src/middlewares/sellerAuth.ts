import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../models/user";
import { userTypeWithId } from "../schemas/userSchema";

const userAuth = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const { token } = req.cookies;
        if(!token){
            res.status(400).json({
                message: "please signin again"
            })
            return;
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {_id:string};
        const { _id } = decoded;
        if(!_id){
            res.status(400).json({
                message: "invalid token"
            })
            return;
        }
        const user: userTypeWithId | null = await User.findById(_id);
        if(!user){
            res.status(404).json({
                message: "no user found with this email id"
            })
            return;
        }
        if(user.role === 'customer'){
            res.status(400).json({
                success: false,
                message: "you aren't an admin"
            })
            return;
        }
        (req as any).user=user;
        next();
    } catch(err){
        console.log(`something went wrong`);
        res.status(500).json({
            message: "something went wrong",
            error: err
        })
    }
}

export default userAuth;