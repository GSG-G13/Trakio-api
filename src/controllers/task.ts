import { log } from 'console';
import { Response, NextFunction } from 'express';
import { CustomError } from '../helper';
import { getTasksByUserId } from '../database/query';
import { TokenRequest } from '../interfaces';

const getTasks = (req: TokenRequest, res: Response, next: NextFunction): void => {
  const userId = req.userData?.id;
  log(userId);
  getTasksByUserId(+userId!)
    .then((tasks) => {
      res.status(200).json({
        message: 'Tasks retrieved successfully',
        data: tasks.rows,
      });
    })
    .catch(() => {
      next(new CustomError(500, 'server error'));
    });
};

export default getTasks;
