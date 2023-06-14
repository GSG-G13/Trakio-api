import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { getTasksByUserId } from '../database/query';
import { TokenRequest } from '../interfaces';
import { addTaskQuery } from '../database/query/tasks';
import { taskSchema } from '../validation';
import { CustomError } from '../helper';

const getTasks = (req: TokenRequest, res: Response, next: NextFunction): void => {
  const userId = req.userData?.id;
  getTasksByUserId(+userId!)
    .then((tasks) => {
      res.status(200).json({
        message: 'Tasks retrieved successfully',
        data: tasks.rows,
      });
    })
    .catch(() => {
      next(new CustomError(500, 'server error'));
    });
};

interface taskInterface{
  title:string,
  description:string,
  projectId: number,
  sectionId: number,
  dueDate: Date,
  priorityId:number,
}

const addTask = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, description, projectId, sectionId, dueDate, priorityId,
  }: taskInterface = req.body;

  taskSchema.validateAsync({
    title,
    description,
    projectId,
    sectionId,
    dueDate,
    priorityId,
  }, { abortEarly: false })
    .then((data) => addTaskQuery(data))
    .then((data: QueryResult) => {
      const taskData = data.rows[0] as taskInterface;
      res.status(201).json({
        message: 'Task Created Successfully',
        data: [
          taskData,
        ],
      })
    })
    .catch(() => next(new CustomError(500, 'server error')))
};

export { addTask, getTasks };
