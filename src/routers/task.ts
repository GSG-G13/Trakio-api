import express, { Router } from 'express'
import getTasks from '../controllers/tasks';
import { authCheck } from '../middleware';

const taskRouter: Router = express.Router();

taskRouter.get('/tasks', authCheck, getTasks);

export default taskRouter;
