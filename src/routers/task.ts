import express, { Router } from 'express';
import { authCheck } from '../middleware';
import { addTask, getTasks, deleteTaskById } from '../controllers';

const taskRouter: Router = express.Router();
taskRouter.post('/tasks', authCheck, addTask);
taskRouter.delete('/task', authCheck, deleteTaskById);
taskRouter.get('/tasks', authCheck, getTasks);

export default taskRouter;
