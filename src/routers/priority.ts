import express, { Router } from 'express'
import { getPrioritiesController } from '../controllers';
import { checkAuth } from '../middleware';

const priorityRouter: Router = express.Router();

priorityRouter.get('/priorities', checkAuth, getPrioritiesController);

export default priorityRouter;
