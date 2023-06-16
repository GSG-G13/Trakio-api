import express, { Router } from 'express'
import {
  addProjectController,
  getProjects,
  deleteProject,
  getProjectByProjectId,
} from '../controllers';
import { authCheck, checkMember } from '../middleware';

const projectRouter: Router = express.Router();

projectRouter.post('/projects', authCheck, addProjectController);
projectRouter.get('/projects', authCheck, getProjects);
projectRouter.get('/projects/details/:id', authCheck, checkMember, getProjectByProjectId);
projectRouter.delete('/projects/:projectId', authCheck, deleteProject);

export default projectRouter
