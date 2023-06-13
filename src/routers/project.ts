import express, { Router } from 'express'
import { addProjectController, getProjects } from '../controllers';
import authCheck from '../middleware';

const projectRouter: Router = express.Router();

projectRouter.post('/projects', authCheck, addProjectController)
projectRouter.get('/projects', authCheck, getProjects);

export default projectRouter
