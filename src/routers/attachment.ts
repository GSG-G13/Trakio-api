import express, { Router } from 'express';
import { addAttachmentController, getAttachmentController } from '../controllers';
import { checkAuth } from '../middleware';

const attachmentRouter: Router = express.Router();

attachmentRouter.post('/attachment/:id', checkAuth, addAttachmentController);
attachmentRouter.get('/attachment/:id', checkAuth, getAttachmentController);

export default attachmentRouter;
