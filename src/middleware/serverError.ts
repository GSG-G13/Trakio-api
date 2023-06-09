/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../helpers';

const errHandler = (err: CustomError, req: Request, res: Response, next:NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message,
  });
};

export default errHandler;
