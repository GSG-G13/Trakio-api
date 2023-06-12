import express, { Router } from 'express';
import authRouter from './auth';
import projectRouter from './project';

const router:Router = express.Router();

router.use(authRouter);
router.use(projectRouter)

export default router;
