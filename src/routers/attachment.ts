import express, { Router } from 'express';
import { addAttachment } from '../controllers';
import { authCheck } from '../middleware';

const attachmentRouter: Router = express.Router();

attachmentRouter.post('/attachment', authCheck, addAttachment);
export default attachmentRouter;
