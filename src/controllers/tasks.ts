import { Response } from 'express';
import { CustomError } from '../helper';
import { getTasksByUserId } from '../database/query/tasks';
import { TokenRequest } from '../interfaces';

const getTasks = (req: TokenRequest, res: Response): void => {
  const userId = req.userData?.id;
  getTasksByUserId(+userId!)
    .then((tasks) => {
      res.status(200).json({
        message: 'Tasks retrieved successfully',
        data: tasks,
      });
    })
    .catch(() => {
      throw new CustomError(500, 'Server Error');
    });
};

export default getTasks;
