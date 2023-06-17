import express, { Router } from 'express';
import {
  addProjectController,
  getProjectsController,
  getProjectByProjectIdController,
  deleteProjectController,
} from '../controllers';
import { checkAuth } from '../middleware';

const projectRouter: Router = express.Router();

projectRouter.post('/project', checkAuth, addProjectController);
projectRouter.get('/projects', checkAuth, getProjectsController);
projectRouter.get('/project/:id', checkAuth, getProjectByProjectIdController);
projectRouter.delete('/project/:id', checkAuth, deleteProjectController);

export default projectRouter;
