import { Request, Response } from "express"
import { userSchema, userType, userTypeWithId } from "../schemas/userSchema"; 
import { User } from "../models/user";
import { comparePassword, hashPassword } from "../utils/password";
import { z } from "zod";

export const UserSignup = async (req: Request,res: Response) => {
    try{
        const data = req.body;
        const refinedData = userSchema.parse(data);
        
        const existingUser: userTypeWithId | null = await User.findOne({
            email: refinedData.email
        })
        if(existingUser){
            res.status(400).json({
                success: false,
                message: "this user already exist"
            })
            return;
        }

        const hashedPassword:string = await hashPassword(refinedData.password);
        const newUser = new User({
            name: refinedData.name,
            email: refinedData.email,
            password: hashedPassword
        });
        const savedUser: userTypeWithId = await newUser.save();

        const token = savedUser.getJwt();
        res.cookie('token',token);
        
        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: savedUser
        });
        return;
    } catch(err){
        if(err instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                message: "invalid signup data",
                error: err
            })
            return;
        }
        console.log(err);
        res.status(500).json({
            success: false,
            message: "something went wrong with the server",
            error: err
        })
        return;
    }
}

export const UserSignin = async (req:Request, res: Response) => {
    try{
        const body = req.body;
        const userSigninSchema = userSchema.pick({
            email: true,
            password: true
        });
        const refinedBody = userSigninSchema.parse(body);

        const user: userTypeWithId | null = await User.findOne({
            email: refinedBody.email
        });

        if(!user){
            res.status(404).json({
                success: false,
                message: "no user found with this email id"
            });
            return;
        }

        const isPasswordCorrect = comparePassword(refinedBody.password, user.password);
        if(!isPasswordCorrect){
            res.status(400).json({
                success: false,
                message: "invalid credentials"
            });
            return;
        }

        const token = user.getJwt();
        res.cookie('token',token);

        res.status(200).json({
            success: true,
            message: "signin successfull"
        });
    } catch(err){
        if(err instanceof z.ZodError){
            res.status(400).json({
                success: false,
                message: "invalid request"
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "internal server error",
            error: err
        });
        return;
    }
}