import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import {
  addProjectQuery,
  addProjectUserQuery,
  getProjectsQuery,
  getProjectByProjectIDQuery,
  deleteProjectByIdQuery,
} from '../database';
import { TokenRequest, ProjectData } from '../interfaces';
import { CustomError, projectSchema } from '../helpers';

const addProjectController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const userId = req.userData?.id;
  const { title, description } = req.body as ProjectData;

  projectSchema.validateAsync({ title, description } as ProjectData)
    .then((data: ProjectData) => addProjectQuery(data.title, data.description))
    .then((data: QueryResult) => {
      const project: ProjectData = data.rows[0];
      addProjectUserQuery(+userId!, data.rows[0].id, 1)
      return Promise.resolve(project);
    })
    .then((project: ProjectData) => {
      res.status(201).json({
        message: 'New Project added Successfully',
        data: project,
      })
    })
    .catch(() => next(new CustomError(500, 'server Error')));
};

const getProjectsController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const userId = req.userData?.id;

  getProjectsQuery(+userId!)
    .then((data) => {
      res.status(200).json({
        message: 'Show Projects Successfully',
        data: data.rows,
      });
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};

const getProjectByProjectIdController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = req.query.projectId!;

  getProjectByProjectIDQuery(+projectId)
    .then((data: QueryResult) => res.status(200).json({
      message: 'Fetch project detail successfully',
      data: data.rows,
    }))
    .catch(() => next(new CustomError(500, 'server error')));
};

const deleteProjectController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const { projectId } = req.params;

  deleteProjectByIdQuery(+projectId)
    .then(() => {
      res.status(200).json({
        message: 'Project deleted successfully',
      });
    })
    .catch(() => {
      next(new CustomError(500, 'Server Error'));
    });
};

export {
  addProjectController,
  getProjectsController,
  getProjectByProjectIdController,
  deleteProjectController,
};
