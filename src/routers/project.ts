import express, { Router } from 'express'
import { getProjects, deleteProject } from '../controllers';
import { authCheck } from '../middleware';

const projectRouter: Router = express.Router();

projectRouter.get('/projects', authCheck, getProjects);
projectRouter.delete('/projects/:projectId', authCheck, deleteProject);

export default projectRouter
