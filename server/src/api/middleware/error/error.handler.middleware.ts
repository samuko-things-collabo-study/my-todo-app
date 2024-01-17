import {Request, Response, NextFunction } from 'express';

export interface Error {
  status?: number;
  message: string;
}

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const customError = {
    statusCode: err.status || 500,
    msg: err.message || 'Something went wrong try again later',
  }

  return res.status(customError.statusCode).json(
    { 
      success: false,
      error: customError.msg,
      status: customError.statusCode
    })
}