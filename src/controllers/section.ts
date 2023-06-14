import { Request, Response, NextFunction } from 'express';
import { getSectionsQuery } from '../database/query';
import { CustomError } from '../helper';

const getSections = (req: Request, res: Response, next: NextFunction) => {
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
export default getSections;
