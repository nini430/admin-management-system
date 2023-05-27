import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';

const errorHandler = (err: any, req: Request, res: Response,next:NextFunction) => {
  let errorResponse = { ...err };
  errorResponse.message = err.message;
  errorResponse = new ErrorResponse(
    err.message || 'Server Error',
    err.statusCode || 500
  );

  return res
    .status(errorResponse.statusCode as number)
    .json({ success: false, message: errorResponse.message });
};

export default errorHandler;
