import express from 'express';
import { loginController, signup, logout } from '../controllers';

const authRouter = express.Router();
authRouter.post('/login', loginController);
authRouter.post('/register', signup);
authRouter.get('/logout', logout);

export default authRouter;
