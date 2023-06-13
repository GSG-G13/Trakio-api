import { Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import { addProjectQuery, addProjectUserQuery, getProjectsQuery } from '../database/query/projects';
import { TokenRequest, ProjectData, ProjectDetailsInterface, projectDataDetails } from '../interfaces';
import { CustomError } from '../helper';
import { projectSchema } from '../validation';

const addProjectController = (req: TokenRequest, _res: Response, next: NextFunction) => {
  const userId = req.userData?.id;
  let projectInfo: projectDataDetails = {
    title: '',
    description: '',
    id: 0,
    created_at: Date.now(),
  };
  const { title, description } = req.body as ProjectData;

  projectSchema.validateAsync({ title, description } as ProjectData)
    .then((data: ProjectData) => addProjectQuery(data.title, data.description))
    .then((data: QueryResult) => {
      projectInfo = { title: 'fff', description: 'fff' };
      addProjectUserQuery(+userId!, data.rows[0].id, 1)
    })
    // .then(() => {
    //   _res.status(201).json({
    //     message: 'New Project added Successfully',
    //     data: {
    //       id: data.rows[0].id,
    //       title: data.rows[0].title,
    //       description: data.rows[0].description,
    //       created_at: data.rows[0].created_at,
    //     },
    //   });
    // })
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
