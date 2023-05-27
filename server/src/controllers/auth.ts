import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { findUser, findUserById } from '../services/user';
import { checkPassword } from '../services/auth';
import jwtVerify from '../utils/jwtVerify';
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';

const loginUser = asyncHandler(
  async (
    req: Request<{}, {}, LoginInput>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse('missing values',400));
    }
    const user = await findUser(email, true) as any;
    if (!user) {
      return next(new ErrorResponse('user is already registered with this E-mail',409));
    }
    const isPasswordCorrect = await checkPassword(password, user);
    if (!isPasswordCorrect) {
      return next(new ErrorResponse('Invalid credentials',401));
    }
    const accessToken=user.generateAccessToken();
    const refreshToken=user.generateRefreshToken();
    
    return res.status(200).json({accessToken,refreshToken, success:true});
  }
);

const refreshToken=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{ 
      const token=req.headers.authorization?.split(' ')[1];
      if(!token) {
        return next(new ErrorResponse('Unauthorized',401));
      }
      const {error,userId}=jwtVerify(token,process.env.JWT_REFRESH_TOKEN_SECRET!);

      if(!!error || !userId) {
        return next(new ErrorResponse('Unauthorized',401));
      }

      const user=await User.findById(userId) as any;
      if(!user) {
        return next(new ErrorResponse('Unauthorized',401));
      }

      const accessToken=user.generateAccessToken();
      return res.status(200).json({accessToken});

})  

const getMe = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    console.log(req.authedUser)
    const user=await findUserById(req.authedUser._id);
    if(!user) {
      return next(new ErrorResponse('Unauthorized',401));
    }else{
      return res.status(200).json(user);
    }
  }
);

export { loginUser, getMe, refreshToken };
