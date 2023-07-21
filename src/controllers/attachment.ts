import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { addAttachmentQuery, getAttachmentQuery } from '../database'
import { TokenRequest, AttachmentInterface, joiInterface } from '../interfaces';
import { attachmentSchema, CustomError } from '../helpers';

const addAttachmentController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const taskId = Number(req.query.taskId);

  const { attachS3, attachmentName }: AttachmentInterface = req.body;
  const userId = req.userData?.id;

  if (isNaN(taskId)) throw new CustomError(400, 'Bad Request');
  attachmentSchema.validateAsync({
    attachS3, userId, taskId, attachmentName,
  }, { abortEarly: false })
    .then(() => addAttachmentQuery(attachS3, +userId!, taskId, attachmentName))
    .then((data: QueryResult) => {
      const attachmentData = data.rows[0] as AttachmentInterface;
      res.status(201).json({
        message: 'Add attachment successfully',
        data: [attachmentData],
      })
    })
    .catch((err: CustomError | joiInterface) => {
      if ('isJoi' in err) {
        next(new CustomError(406, err.details[0].message));
      } else {
        next(err);
      }
    })
};

const getAttachmentController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = Number(req.params.id);

  if (isNaN(projectId)) throw new CustomError(400, 'Bad Request');
  getAttachmentQuery(projectId)
    .then((data: QueryResult) => {
      res.status(200).json({
        message: 'Fetch attachment successfully',
        data: data.rows,
      })
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};

export { addAttachmentController, getAttachmentController };
