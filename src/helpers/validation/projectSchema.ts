const Joi = require('joi');

const projectSchema = Joi.object({
  title: Joi.string().min(3).max(250).required(),
  description: Joi.string().min(10).max(600).required(),
});

export default projectSchema;
