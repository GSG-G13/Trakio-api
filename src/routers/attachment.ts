import express, { Router } from 'express';
import { getAttachment } from '../controllers';
import { authCheck } from '../middleware';

const attachmentRouter: Router = express.Router();

attachmentRouter.get('/attachment', authCheck, getAttachment);

export default attachmentRouter;
