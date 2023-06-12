import express from 'express';
import { loginController, signup } from '../controllers';

const authRouter = express.Router();
authRouter.post('/login', loginController);
authRouter.post('/register', signup);

export default authRouter;
