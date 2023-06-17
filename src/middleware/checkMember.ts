import { Response, NextFunction } from 'express'
import { QueryResult } from 'pg'
import { RoleRequest, roleType } from '../interfaces'
import { checkForMemberInProject } from '../database/query'
import { CustomError } from '../helpers'

const checkMember = (req:RoleRequest, res: Response, next: NextFunction) => {
  const userId = req.userData!.id
  const projectId = req.params.id

  let role: roleType
  checkForMemberInProject(+userId!, +projectId!)
    .then((data: QueryResult) => {
      if (data.rows.length === 0) {
        throw new CustomError(403, 'You are not a member')
      }
      role = data.rows[0].role
      req.userRole = role
      next()
    }).catch((err) => next(err))
}

export default checkMember;
