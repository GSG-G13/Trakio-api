import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import {
  addTaskQuery,
  getTasksByUserIdQuery,
  getTaskByProjectAndSectionQuery,
  editTaskQuery,
  deleteTaskByIdQuery,
} from '../database';
import { TokenRequest, TaskInterface, joiInterface } from '../interfaces';
import { taskSchema, CustomError } from '../helpers';
import { addProjectUserQuery, checkForMemberInProject } from '../database/query';

const addTaskController = (req: Request, res: Response, next: NextFunction) => {
  const projectId = Number(req.params.id);
  let taskData: TaskInterface;
  const {
    title, description, userId, sectionId, dueDate, priorityId,
  }: TaskInterface = req.body;

  if (isNaN(projectId)) throw new CustomError(400, 'Bad Request')
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
      taskData = data.rows[0] as TaskInterface;
      return Promise.resolve(taskData);
    })
    .then(() => checkForMemberInProject(userId, projectId))
    .then((data: QueryResult) => {
      if (data.rows.length === 0) {
        return addProjectUserQuery(userId, projectId, 2)
      }
      return Promise.resolve(data);
    })
    .then(() => res.status(201).json({
      message: 'Task Created Successfully',
      data: [
        taskData,
      ],
    }))
    .catch((err: CustomError | joiInterface) => {
      if ('isJoi' in err) {
        next(new CustomError(406, err.details[0].message));
      } else {
        next(err);
      }
    });
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
  const projectId = Number(req.params.id);

  if (isNaN(projectId)) throw new CustomError(400, 'Bad Request');
  getTaskByProjectAndSectionQuery(projectId)
    .then((data: QueryResult) => res.status(200).json({
      message: 'Fetch all tasks from a project',
      data: data.rows,
    }))
    .catch(() => next(new CustomError(500, 'server error')));
};

const editTaskController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = Number(req.params.id);
  const taskId = Number(req.query.taskId);

  const {
    title,
    description,
    userId,
    priorityId,
    dueDate,
    sectionId,
  } = req.body as TaskInterface;

  if (isNaN(taskId) || isNaN(projectId)) throw new CustomError(400, 'Bad Request');
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
  const taskId = Number(req.query.taskId);

  if (isNaN(taskId)) throw new CustomError(400, 'Bad Request');
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
