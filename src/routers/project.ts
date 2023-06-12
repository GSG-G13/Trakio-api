import express, { Router } from 'express'
import { getProjects } from '../controllers';
import { authCheck } from '../middleware';

const projectRouter: Router = express.Router();

projectRouter.get('/projects', authCheck, getProjects);

export default projectRouter
