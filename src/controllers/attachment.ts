import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { TokenRequest, AttachmentInterface } from '../interfaces';
import { addAttachmentQuery } from '../database/query';
import { CustomError } from '../helper';
import { attachmentSchema } from '../validation';

const addAttachment = (req: TokenRequest, res: Response, next: NextFunction) => {
  const { attachS3, taskId }: AttachmentInterface = req.body;
  const userId = req.userData?.id
  attachmentSchema.validateAsync({ attachS3, userId, taskId }, { abortEarly: false })
    .then(() => addAttachmentQuery(attachS3, +userId!, +taskId!))
    .then((data: QueryResult) => {
      const attachmentData = data.rows[0] as AttachmentInterface;
      res.status(201).json({
        message: 'Add attchement successfully',
        data: [attachmentData],
      })
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};

export default addAttachment;
