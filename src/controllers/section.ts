import { Request, Response, NextFunction } from 'express';
import { getSectionsQuery } from '../database';
import { CustomError } from '../helpers';

const getSectionsController = (req: Request, res: Response, next: NextFunction) => {
  getSectionsQuery()
    .then((data) => {
      res.status(200).json({
        message: 'Fetch sections Successfully',
        data: data.rows,
      })
    })
    .catch(() => {
      next(new CustomError(500, 'server error'));
    });
};

export default getSectionsController;
