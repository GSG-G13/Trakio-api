import express, { Router } from 'express'
import {
  addProjectController,
  getProjects,
  deleteProject,
  getProjectByProjectId,
} from '../controllers';
import { authCheck } from '../middleware';

const projectRouter: Router = express.Router();

projectRouter.post('/projects', authCheck, addProjectController);
projectRouter.get('/projects', authCheck, getProjects);
projectRouter.get('/projects/details', authCheck, getProjectByProjectId);
projectRouter.delete('/projects/:projectId', authCheck, deleteProject);

export default projectRouter
