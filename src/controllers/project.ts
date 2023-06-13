import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { getProjectsQuery, deleteProjectById, getProjectByProjectIDQuery } from '../database/query/projects';
import { TokenRequest } from '../interfaces';
import { CustomError } from '../helper';

const getProjects = (req: TokenRequest, res: Response, next: NextFunction) => {
  const userId = req.userData?.id;
  getProjectsQuery(+userId!)
    .then((data) => {
      if (data.rowCount > 0) {
        res.status(200).json({
          message: 'Show Projects Successfully',
          data: data.rows,
        });
      }
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};
const deleteProject = (req: TokenRequest, res: Response, next: NextFunction) => {
  const { projectId } = req.params;

  deleteProjectById(+projectId)
    .then(() => {
      res.status(200).json({
        message: 'Project deleted successfully',
      });
    })
    .catch(() => {
      next(new CustomError(500, 'Server Error'));
    });
};

const getProjectByProjectId = (req: TokenRequest, res: Response, next: NextFunction) => {
  const projectId = req.query.projectId!
  getProjectByProjectIDQuery(+projectId)
    .then((data: QueryResult) => res.status(200).json({
      message: 'Fetch project detail successfully',
      data: data.rows,
    }))
    .catch(() => next(new CustomError(500, 'server error')))
}

export { getProjects, deleteProject, getProjectByProjectId };
