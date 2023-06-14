import { NextFunction, Request, Response } from 'express'

const clientError = (req: Request, res: Response, next:NextFunction) => {
  res.status(404).send('<h1>Page Not Found</h1>')
  next()
}

export default clientError;
