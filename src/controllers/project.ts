import { Response, NextFunction } from 'express';
import { getProjectsQuery } from '../database/query/projects';
import { TokenRequest } from '../interfaces';
import { CustomError } from '../helper';

const getProjects = (req: TokenRequest, res: Response, next: NextFunction) => {
  const userId = req.userData?.id;
  getProjectsQuery(+userId!)
    .then((data) => {
      if (data.rowCount > 0) {
        res.status(200).json({
          message: 'Show Projects Successfully',
          data: data.rows,
        });
      }
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};

export default getProjects;
