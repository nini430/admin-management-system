import mongoose from "mongoose";
import log from "./logger";


const connectDB=async()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI!);
    log.info(`succesfully connected to ${conn.connection.host}`)
}

mongoose.connection.on('error',err=>{
    log.error(err,'Could not connect to MongoDB');
})

export default connectDB;
