import express, { Router } from 'express'
import getTasks from '../controllers/task';
import { authCheck } from '../middleware';

const taskRouter: Router = express.Router();

taskRouter.get('/tasks', authCheck, getTasks);

export default taskRouter;
