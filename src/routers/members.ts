import express, { Router } from 'express';
import { getMembersByProjectIdController } from '../controllers';
import { checkAuth, checkMember } from '../middleware';

const membersRouter: Router = express.Router();

membersRouter.get('/project/:id/members', checkAuth, checkMember, getMembersByProjectIdController);

export default membersRouter;
