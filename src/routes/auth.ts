import express from 'express';
import { loginController } from '../controllers';
import authCheck from '../middleware/checkAuth';

const authRouter = express.Router();
authRouter.post('/login', authCheck, loginController);

export default authRouter;
