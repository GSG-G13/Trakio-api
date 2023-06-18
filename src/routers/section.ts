import express, { Router } from 'express'
import { getSectionsController } from '../controllers';
import { checkAuth } from '../middleware';

const sectionRouter: Router = express.Router();

sectionRouter.get('/sections', checkAuth, getSectionsController);

export default sectionRouter;
