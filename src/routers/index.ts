import express, { Router } from 'express';
import authRouter from './auth';
import projectRouter from './project';
import taskRouter from './task';
import { errHandler } from '../middleware';
import sectionRouter from './section';
import attachmentRouter from './attachment';

const router:Router = express.Router();

router.use(authRouter);
router.use(projectRouter);
router.use(taskRouter);
router.use(sectionRouter);
router.use(attachmentRouter);
router.use(errHandler)

export default router;
