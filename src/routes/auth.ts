import express from 'express';
import { loginController } from '../controllers';

const authRouter = express.Router();
authRouter.post('/login', loginController);

export default authRouter;
