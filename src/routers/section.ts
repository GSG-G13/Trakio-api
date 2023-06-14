import express, { Router } from 'express'
import { getSections } from '../controllers';
import { authCheck } from '../middleware';

const sectionRouter: Router = express.Router();

sectionRouter.get('/sections', authCheck, getSections);

export default sectionRouter;
