import { Response, NextFunction } from 'express'
import { RoleRequest } from '../interfaces'
import { CustomError } from '../helpers'

const checkManager = (req: RoleRequest, res: Response, next: NextFunction) => {
  if (req.userRole === 'manager') {
    next()
  } else {
    next(new CustomError(401, 'Only the project manager has access to this function'))
  }
}

export default checkManager
