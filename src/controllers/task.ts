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
    .catch(() => next(new CustomError(500, 'server error')));
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
  const sectionId = +req.query.sectionId!;

  getTaskByProjectAndSectionQuery(+projectId!, +sectionId!)
    .then((data: QueryResult) => res.status(200).json({
      message: 'Fetch all tasks from a project',
      data: data.rows,
    }))
    .catch(() => next(new CustomError(500, 'server error')));
};

const editTaskController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const taskId = +req.params.id!;
  const {
    title,
    description,
    projectId,
    priorityId,
    dueDate,
    sectionId,
  } = req.body as TaskInterface;

  taskSchema.validateAsync({
    title,
    description,
    projectId,
    sectionId,
    dueDate,
    priorityId,
  })
    .then((updatedTask) => editTaskQuery({ id: taskId, ...updatedTask }))
    .then((data: QueryResult) => res.json({
      message: 'Task Updated Successfully',
      data: data.rows,
    }))
    .catch(() => next(new CustomError(500, 'server Error')));
};

const deleteTaskByIdController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const taskId = +req.params.id!;

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
