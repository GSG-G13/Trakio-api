import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { addTaskQuery, getTasksByUserId, deleteTaskByIdQuery, editTaskQuery } from '../database/query';
import { TokenRequest, TaskInterface } from '../interfaces';
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

const addTask = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, description, projectId, sectionId, dueDate, priorityId,
  }: TaskInterface = req.body;

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
      const taskData = data.rows[0] as TaskInterface;
      res.status(201).json({
        message: 'Task Created Successfully',
        data: [
          taskData,
        ],
      })
    })
    .catch(() => next(new CustomError(500, 'server error')))
};

const editTaskController = (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.query.task_id;
  console.log(taskId);
  const {
    title,
    description,
    projectId,
    priorityId,
    sectionId,
  } = req.body as TaskInterface;

  taskSchema.validateAsync({
    title,
    description,
    projectId,
    sectionId,
    priorityId,
  })
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
};

const deleteTaskById = (req: TokenRequest, res: Response, next: NextFunction) => {
  const { taskId } = req.query;

  deleteTaskByIdQuery(+taskId!)
    .then(() => {
      res.status(200).json({
        message: 'Task Deleted successfully',
      })
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
}

export {
  addTask,
  getTasks,
  editTaskController,
  deleteTaskById,
};
