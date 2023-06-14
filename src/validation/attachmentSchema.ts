import Joi from 'joi';

const attachmentSchema = Joi.object({
  attachS3: Joi.string().required(),
  userId: Joi.number().min(0).required,
  taskId: Joi.number().required(),
});
export default attachmentSchema;
