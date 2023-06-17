import express, { Router } from 'express';
import { getMembersByProjectIdController } from '../controllers';
import { checkAuth } from '../middleware';

const membersRouter: Router = express.Router();

membersRouter.get('/project/members', checkAuth, getMembersByProjectIdController);

export default membersRouter;
