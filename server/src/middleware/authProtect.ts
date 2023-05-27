import { NextFunction,Response } from 'express';
import asyncHandler from 'express-async-handler'
import jwtVerify from '../utils/jwtVerify';
import User from '../models/User';
import ErrorResponse from '../utils/errorResponse';

const authProtect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let user;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(new ErrorResponse('Unauthorized',401));
  }

  const { error, userId } = jwtVerify(
    token,
    process.env.JWT_ACCESS_TOKEN_SECRET!
  );
  if (error) {  
    return next(new ErrorResponse('Unauthorized',401));
  }
  if (userId) {
    user = await User.findById(userId);
    if (!user) {
      return next(new ErrorResponse('Unauthorized',401));
    }
  }

  req.authedUser = user;
  next();
});

export default authProtect;
 