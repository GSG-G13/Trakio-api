import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { TokenRequest } from '../interfaces';
import { getAttachmentQuery } from '../database/query';
import { CustomError } from '../helper';

const getAttachment = (req: TokenRequest, res: Response, next: NextFunction) => {
  const { userId, taskId } = req.query;

  getAttachmentQuery(+userId!, +taskId!)
    .then((data: QueryResult) => {
      res.status(200).json({
        message: 'Fetch attchement successfully',
        data: data.rows,
      })
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};
export default getAttachment;
