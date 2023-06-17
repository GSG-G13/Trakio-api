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
taskRouter.get('/tasks/project/:projectId', checkAuth, getTasksByProjectAndSection);
taskRouter.put('/task', checkAuth, editTaskController);
taskRouter.delete('/task', checkAuth, deleteTaskByIdController);

export default taskRouter;
