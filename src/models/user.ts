import mongoose, { Document, Types } from "mongoose";
import jwt from "jsonwebtoken";
import { isValidPhoneNumber } from "libphonenumber-js";

interface User extends Document{
    name: string,
    email: string,
    password: string,
    address: string,
    phone: string,
    role: string,
    orders: Types.ObjectId[],
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
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (number: string) {
                return isValidPhoneNumber(number);
            },
            message: "Invalid phone number",
        },
    },
    role: {
        type: String,
        enum: ["customer","admin"],
        default: "customer",
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Date,
        default: null
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

userSchema.methods.getJwt = function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET!,{
        expiresIn: '7d'
    });
    return token;
}

export const User = mongoose.models.User || mongoose.model('User',userSchema);