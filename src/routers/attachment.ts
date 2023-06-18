import express, { Router } from 'express';
import { addAttachmentController, getAttachmentController } from '../controllers';
import { checkAuth, checkMember } from '../middleware';

const attachmentRouter: Router = express.Router();

attachmentRouter.post('/project/:id/attachments', checkAuth, checkMember, addAttachmentController);
attachmentRouter.get('/project/:id/attachments', checkAuth, checkMember, getAttachmentController);

export default attachmentRouter;
