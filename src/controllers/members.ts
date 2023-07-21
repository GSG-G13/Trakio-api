import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { TokenRequest } from '../interfaces';
import { getMembersByProjectQuery } from '../database';
import { CustomError } from '../helpers';
import { addMemberToProject, checkForMemberInProject } from '../database/query';

const getMembersByProjectIdController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = Number(req.params.id);

  if (isNaN(projectId)) throw new CustomError(400, 'Bad Request');
  getMembersByProjectQuery(projectId)
    .then((data: QueryResult) => res.status(200).json({
      messages: 'Fetch members Successfully',
      data: data.rows,
    }))
    .catch(() => next(new CustomError(500, 'server error')));
};

const addMember = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = Number(req.params.id);
  const { users } = req.body;

  const promises = users.map((user: number) => checkForMemberInProject({ userId: user, projectId })
    .then((data: QueryResult) => {
      if (!data.rows.length) {
        return addMemberToProject({ userId: user, projectId });
      }
    })
    .catch(() => {
      throw new CustomError(406, 'Invalid entry');
    }));

  Promise.all(promises)
    .then(() => {
      res.status(200).json({
        message: 'Members added to project successfully',
      });
    })
    .catch((error) => {
      next(error);
    });
};

export { getMembersByProjectIdController, addMember };
