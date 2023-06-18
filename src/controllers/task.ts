import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import {
  addTaskQuery,
  getTasksByUserIdQuery,
  getTaskByProjectAndSectionQuery,
  editTaskQuery,
  deleteTaskByIdQuery,
} from '../database';
import { TokenRequest, TaskInterface } from '../interfaces';
import { taskSchema, CustomError } from '../helpers';

const addTaskController = (req: Request, res: Response, next: NextFunction) => {
  const projectId = +req.params.id
  const {
    title, description, userId, sectionId, dueDate, priorityId,
  }: TaskInterface = req.body;

  taskSchema.validateAsync({
    title,
    description,
    projectId,
    userId,
    sectionId,
    dueDate,
    priorityId,
  }, { abortEarly: true })
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
    .catch((err) => next(new CustomError(500, err)));
};

const getTasksController = (req: TokenRequest, res: Response, next: NextFunction): void => {
  const userId = req.userData?.id;

  getTasksByUserIdQuery(+userId!)
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

const getTasksByProjectAndSection = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = +req.params.id!;
  // const sectionId = +req.query.sectionId!;

  getTaskByProjectAndSectionQuery(+projectId!)
    .then((data: QueryResult) => res.status(200).json({
      message: 'Fetch all tasks from a project',
      data: data.rows,
    }))
    .catch(() => next(new CustomError(500, 'server error')));
};

const editTaskController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = +req.params.id
  const taskId = +req.query.taskId!;

  const {
    title,
    description,
    userId,
    priorityId,
    dueDate,
    sectionId,
  } = req.body as TaskInterface;

  taskSchema.validateAsync({
    title,
    description,
    projectId,
    userId,
    sectionId,
    dueDate,
    priorityId,
  })
    .then((updatedTask) => editTaskQuery({ id: taskId, ...updatedTask }))
    .then((data: QueryResult) => res.json({
      message: 'Task Updated Successfully',
      data: data.rows,
    }))
    .catch((err) => next(err));
};

const deleteTaskByIdController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const taskId = +req.query.taskId!;

  deleteTaskByIdQuery(taskId)
    .then((data) => {
      res.status(200).json({
        message: 'Task Deleted successfully',
        data: data.rows,
      })
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};

export {
  addTaskController,
  getTasksController,
  getTasksByProjectAndSection,
  editTaskController,
  deleteTaskByIdController,
};
