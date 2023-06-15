import { NextFunction, Request, Response } from 'express'

const clientError = (req: Request, res: Response, next:NextFunction) => {
  res.status(404).json({
    message: 'Page Not Found',
  })
  next()
}

export default clientError;
