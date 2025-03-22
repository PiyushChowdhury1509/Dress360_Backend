import mongoose, { Document } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";

interface User extends Document{
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    verifyOtp: string,
    verifyOtpExpireAt: Date
    resetOtp: string,
    resetOtpExpireAt: Date
}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Date,
        default: 0
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Date,
        default: 0
    }
}, { timestamps: true });

userSchema.methods.getJwt = function(){
    const thisuser = this;
    const token = jwt.sign({ _id: thisuser._id as JwtPayload}, process.env.JWT_SECRET!,{
        expiresIn: '7d'
    });
    return token;
}

export const User = mongoose.models.User || mongoose.model('User',userSchema);