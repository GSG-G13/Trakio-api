import express, { Router } from 'express';
import { checkAuth, checkMember, checkManager } from '../middleware';
import {
  addTaskController,
  getTasksController,
  getTasksByProjectAndSection,
  editTaskController,
  deleteTaskByIdController,
} from '../controllers';

const taskRouter: Router = express.Router();

taskRouter.post('/project/:id/task', checkAuth, checkMember, checkManager, addTaskController);
taskRouter.get('/tasks', checkAuth, getTasksController);
taskRouter.get('/project/:id/task', checkAuth, checkMember, getTasksByProjectAndSection);
taskRouter.put('/project/:id/task', checkAuth, checkMember, checkManager, editTaskController); // it has taskId in the query
taskRouter.delete('/project/:id/task', checkAuth, checkMember, checkManager, deleteTaskByIdController); // it has taskId in the query

export default taskRouter;
