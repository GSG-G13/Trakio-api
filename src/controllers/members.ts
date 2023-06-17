import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { TokenRequest } from '../interfaces';
import { getMembersByProjectQuery } from '../database';
import { CustomError } from '../helpers';

const getMembersByProjectIdController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = +req.params.id!;

  getMembersByProjectQuery(projectId)
    .then((data: QueryResult) => res.status(200).json({
      messages: 'Fetch members Successfully',
      data: data.rows,
    }))
    .catch(() => next(new CustomError(500, 'server error')));
};

export default getMembersByProjectIdController;
