import express, { Router } from 'express';
import authCheck from '../middleware';
import { deleteTaskById } from '../controllers';

const taskRouter: Router = express.Router();
taskRouter.delete('/task/delete', authCheck, deleteTaskById)

export default taskRouter;
