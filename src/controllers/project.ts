import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { addProjectQuery, addProjectUserQuery, getProjectsQuery } from '../database/query/projects';
import { TokenRequest, ProjectData } from '../interfaces';
import { CustomError } from '../helper';
import { projectSchema } from '../validation';

const addProjectController = (req: TokenRequest, _res: Response, next: NextFunction) => {
  const userId = req.userData?.id;

  const { title, description } = req.body as ProjectData;

  projectSchema.validateAsync({ title, description } as ProjectData)
    .then((data: ProjectData) => addProjectQuery(data.title, data.description))
    .then((data: QueryResult) => addProjectUserQuery(+userId!, data.rows[0].id, 1))
    .then((data:QueryResult)=> console.log(data))
    .catch(() => next(new CustomError(500, 'server Error')));
}

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

export { addProjectController, getProjects };
