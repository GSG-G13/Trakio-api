import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { TokenRequest } from '../interfaces';
import { getMembersByProjectQuery } from '../database/query';
import { CustomError } from '../helpers';

const getMembersByProjectId = (req: TokenRequest, res: Response, next: NextFunction) => {
  const { projectId } = req.query
  getMembersByProjectQuery(+projectId!)
    .then((data: QueryResult) => res.status(200).json({
      messages: 'Fetch members Successfully',
      data: data.rows,
    }))
    .catch(() => next(new CustomError(500, 'server error')))
}

export default getMembersByProjectId;
