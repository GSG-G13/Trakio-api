import express, { Router } from 'express';
import { addAttachmentController, getAttachmentController } from '../controllers';
import { checkAuth } from '../middleware';

const attachmentRouter: Router = express.Router();

attachmentRouter.post('/attachment', checkAuth, addAttachmentController);
attachmentRouter.get('/attachment', checkAuth, getAttachmentController);

export default attachmentRouter;
