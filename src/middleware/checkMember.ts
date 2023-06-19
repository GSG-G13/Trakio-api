import { Response, NextFunction } from 'express'
import { QueryResult } from 'pg'
import { RoleRequest, roleType } from '../interfaces'
import { checkForMemberInProject } from '../database/query'
import { CustomError } from '../helpers'

const checkMember = (req:RoleRequest, res: Response, next: NextFunction) => {
  const userId = Number(req.userData!.id)
  const projectId = Number(req.params.id)

  if (isNaN(userId) || isNaN(projectId)) throw new CustomError(406, 'Bad Request');
  let role: roleType
  checkForMemberInProject({ userId, projectId })
    .then((data: QueryResult) => {
      if (!data.rows.length) {
        throw new CustomError(403, 'You are not a member')
      }
      role = data.rows[0].role
      req.userRole = role
      next()
    }).catch((err) => next(err))
}

export default checkMember;
