import Joi from 'joi';

const signupSchema = Joi.object({
  name: Joi.string().alphanum().min(4).max(50)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
  phone: Joi.string().min(7).max(10).required(),
  password: Joi.string().alphanum().min(8).max(50)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .regex(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
  password: Joi.string().min(8).max(50)
    .required(),
});

const taskSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(0).max(1000).required(),
  projectId: Joi.number().required(),
  sectionId: Joi.number().required(),
  dueDate: Joi.date().required(),
  priorityId: Joi.number().required(),
})
export { signupSchema, loginSchema, taskSchema };
