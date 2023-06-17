import express, { Router } from 'express';
import { checkAuth } from '../middleware';
import {
  addTaskController,
  getTasksController,
  getTasksByProjectAndSection,
  editTaskController,
  deleteTaskByIdController,
} from '../controllers';

const taskRouter: Router = express.Router();

taskRouter.post('/task', checkAuth, addTaskController);
taskRouter.get('/tasks', checkAuth, getTasksController);
taskRouter.get('/tasks/:id', checkAuth, getTasksByProjectAndSection);
taskRouter.put('/task/:id', checkAuth, editTaskController);
taskRouter.delete('/task/:id', checkAuth, deleteTaskByIdController);

export default taskRouter;
