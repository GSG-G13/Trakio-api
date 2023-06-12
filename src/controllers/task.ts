import { Request, Response, NextFunction } from 'express';
import addTaskQuery from '../database/query/tasks';
import { taskSchema } from '../validation';
import { CustomError } from '../helper';

const addTask = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, description, projectId, sectionId, dueDate, priorityId,
  }: {
    title:string,
    description:string,
    projectId: number,
    sectionId: number,
    dueDate: Date,
    priorityId:number,
  } = req.body;

  taskSchema.validateAsync({
    title,
    description,
    projectId,
    sectionId,
    dueDate,
    priorityId,
  }, { abortEarly: false })
    .then((data) => addTaskQuery(data))
    .then(() => {
      res.status(201).json({
        message: 'Task Created Successfully',
        data: [
          {
            title, description, priorityId, projectId, sectionId, dueDate,
          },
        ],
      })
    })
    .catch(() => next(new CustomError(500, 'Server Error')))
};

export default addTask;
