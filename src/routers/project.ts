import express, { Router } from 'express';
import {
  addProjectController,
  getProjectsController,
  getProjectByProjectIdController,
  deleteProjectController,
} from '../controllers';
import { checkMember, checkManager, checkAuth } from '../middleware'

const projectRouter: Router = express.Router();

projectRouter.post('/project', checkAuth, addProjectController);
projectRouter.get('/projects', checkAuth, getProjectsController);
projectRouter.get('/project/:id', checkAuth, checkMember, getProjectByProjectIdController);
projectRouter.delete('/project/:id', checkAuth, checkMember, checkManager, deleteProjectController);

export default projectRouter;
