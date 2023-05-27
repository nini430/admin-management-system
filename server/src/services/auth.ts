import bcrypt from 'bcrypt';
import User from "../models/User";


const checkPassword=async(password:string,user:any)=>{
    const isPasswordCorrect=await user.comparePassword(password);
    return isPasswordCorrect;
}

export {checkPassword};