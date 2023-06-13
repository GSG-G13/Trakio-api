import { Response, NextFunction } from 'express';
import { deleteTaskByIdQuery } from '../database/query';
import { TokenRequest } from '../interfaces';
import { CustomError } from '../helper';

const deleteTaskById = (req: TokenRequest, res: Response, next: NextFunction) => {
  const { taskId } = req.params;
  deleteTaskByIdQuery(+taskId)
    .then(() => {
      res.status(204).json({
        message: 'Task Deleted successfully',
      })
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
}

export default deleteTaskById;
