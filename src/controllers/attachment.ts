import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { addAttachmentQuery, getAttachmentQuery } from '../database'
import { TokenRequest, AttachmentInterface } from '../interfaces';
import { attachmentSchema, CustomError } from '../helpers';

const addAttachmentController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const taskId = +req.params.id!;
  console.log(taskId, 'test task');
  const { attachS3 }: AttachmentInterface = req.body;
  const userId = req.userData?.id;

  attachmentSchema.validateAsync({ attachS3, userId, taskId }, { abortEarly: false })
    .then(() => addAttachmentQuery(attachS3, +userId!, taskId))
    .then((data: QueryResult) => {
      const attachmentData = data.rows[0] as AttachmentInterface;
      res.status(201).json({
        message: 'Add attachment successfully',
        data: [attachmentData],
      })
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};

const getAttachmentController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = +req.params.id!;

  getAttachmentQuery(+projectId!)
    .then((data: QueryResult) => {
      res.status(200).json({
        message: 'Fetch attachment successfully',
        data: data.rows,
      })
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};

export { addAttachmentController, getAttachmentController };
