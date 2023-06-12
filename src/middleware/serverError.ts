import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../helper';

const errHandler = (err: CustomError, req: Request, res: Response, next:NextFunction) => {
  const statusCode = err.status || 505;
  const message = err.message || 'Something went Wrong';

  res.status(statusCode).json({
    error: true,
    message,
  });

  next()
};

export default errHandler
