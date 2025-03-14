import mongoose from "mongoose";

const connectDB = async () => {
    try{
        mongoose.connection.on('connected',()=>{
            console.log("database successfully connected");
        })
        mongoose.connection.on('error',()=>{
            console.log("db connection failed");
        })
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch(err){
        console.log("couldnt connect database, error: ",err);
    }
}

export default connectDB;