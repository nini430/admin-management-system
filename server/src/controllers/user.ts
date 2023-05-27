import asyncHandler from 'express-async-handler';
import { createUser, findUser } from "../services/user";
import { NextFunction, Request,Response } from 'express';


const registerUser=asyncHandler(async(req:Request<{},{},RegisterInput>,res:Response,next:NextFunction)=>{
        const user=await findUser(req.body.email);
        if(user) {
          return next();
        }
        await createUser(req.body);
        return res.status(201).json({msg:'User Registered succesfully!',success:true})

});


export {registerUser};