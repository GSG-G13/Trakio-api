import { Request, Response, NextFunction } from 'express';
import { getPrioritiesQuery } from '../database';
import { CustomError } from '../helpers';

const getPrioritiesController = (req: Request, res: Response, next: NextFunction) => {
  getPrioritiesQuery()
    .then((data) => {
      res.status(200).json({
        message: 'Show Priorities Successfully',
        data: data.rows,
      })
    })
    .catch(() => {
      next(new CustomError(500, 'server error'));
    });
};

export default getPrioritiesController;
