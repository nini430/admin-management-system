import User from "../models/User";

const findUser=async(email:string,withPass:boolean=false)=>{
    let user;
    if(withPass) {
        user=await User.findOne({email}).select('+password');
    }else{
        user=await User.findOne({email});
    }
    return user;
}


const findUserById=async(id:string)=>{
    const user=await User.findById(id);
    return user;
}
const createUser=async(input:RegisterInput)=>{
    const {email,firstName,lastName,password}=input;
    const user=new User({email,firstName,lastName,password});
    await user.save();
    return user;
}




export {createUser,findUser,findUserById};

