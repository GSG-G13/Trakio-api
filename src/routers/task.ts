import express, { Router } from 'express';
import { authCheck, checkManager, checkMember } from '../middleware';
import {
  addTask,
  getTasks,
  deleteTaskById,
  editTaskController,
  getTasksByProjectAndSection,
} from '../controllers';

const taskRouter: Router = express.Router();
taskRouter.post('/tasks/:id', authCheck, checkMember, checkManager, addTask);
taskRouter.delete('/task', authCheck, deleteTaskById);
taskRouter.get('/tasks', authCheck, getTasks);
taskRouter.put('/task', authCheck, editTaskController)
taskRouter.get('/project/tasks/:projectId', authCheck, getTasksByProjectAndSection)

export default taskRouter;
