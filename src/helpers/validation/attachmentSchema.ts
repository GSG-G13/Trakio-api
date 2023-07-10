import Joi from 'joi';

const attachmentSchema = Joi.object({
  attachS3: Joi.string().required(),
  userId: Joi.number().min(0).required(),
  taskId: Joi.number().required(),
  attachmentName: Joi.string().required(),
});

export default attachmentSchema;
