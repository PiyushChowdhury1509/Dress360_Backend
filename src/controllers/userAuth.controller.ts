import { Request, Response } from "express"
import { userSchema, userTypeWithId } from "../schemas/userSchema"; 
import { User } from "../models/user";
import { hashPassword } from "../utils/password";
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