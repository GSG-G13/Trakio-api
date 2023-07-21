import express, { Router } from 'express';
import { addMember, getMembersByProjectIdController } from '../controllers';
import { checkAuth, checkManager, checkMember } from '../middleware';

const membersRouter: Router = express.Router();

membersRouter.get('/project/:id/members', checkAuth, checkMember, getMembersByProjectIdController);
membersRouter.post('/project/:id/members', checkAuth, checkMember, checkManager, addMember)

export default membersRouter;
