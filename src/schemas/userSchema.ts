import { Types } from "mongoose";
import { z } from "zod";

export const userSchema = z.object({
    name: z
    .string()
    .trim()
    .min(1,"name can't be empty")
    .max(255,"name is too long"),

    email: z
    .string()
    .email("invalid email id"),

    password: z
    .string()
    .min(6,"password must be atleast 6 characters long")
})

export type userType = z.infer<typeof userSchema>;
export type userTypeWithId = userType & { _id: Types.ObjectId, getJwt():string, createdAt: Date, updatedAt: Date};