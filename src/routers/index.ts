import express, { Router } from 'express';
import authRouter from './auth';
import projectRouter from './project';
import taskRouter from './task';

const router:Router = express.Router();

router.use(authRouter);
router.use(projectRouter)
router.use(taskRouter);

export default router;
