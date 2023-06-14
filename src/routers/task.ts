import express, { Router } from 'express'
import { getTasks, addTask } from '../controllers/task';
import { authCheck } from '../middleware';

const taskRouter: Router = express.Router();

taskRouter.get('/tasks', authCheck, getTasks);
taskRouter.post('/tasks', authCheck, addTask);

export default taskRouter;
