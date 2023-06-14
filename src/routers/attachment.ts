import express, { Router } from 'express';
import { getAttachment, addAttachment } from '../controllers';
import { authCheck } from '../middleware';

const attachmentRouter: Router = express.Router();

attachmentRouter.get('/attachment', authCheck, getAttachment);
attachmentRouter.post('/attachment', authCheck, addAttachment);
export default attachmentRouter;
