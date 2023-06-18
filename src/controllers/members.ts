import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { TokenRequest } from '../interfaces';
import { getMembersByProjectQuery } from '../database';
import { CustomError } from '../helpers';

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

export default getMembersByProjectIdController;
