import express from 'express';
import { signupController, loginController, logoutController } from '../controllers';

const authRouter = express.Router();

authRouter.post('/signup', signupController);
authRouter.post('/login', loginController);
authRouter.get('/logout', logoutController);

export default authRouter;
