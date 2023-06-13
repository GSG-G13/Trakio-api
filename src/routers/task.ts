import express, { Router } from 'express';
import { addTask } from '../controllers';
import { authCheck } from '../middleware';

const taskRouter: Router = express.Router();
taskRouter.post('/tasks', authCheck, addTask);

export default taskRouter;
