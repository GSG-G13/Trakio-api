import express from 'express';
import {
  signupController, loginController, logoutController, deleteAccountController,
} from '../controllers';

const authRouter = express.Router();

authRouter.post('/signup', signupController);
authRouter.post('/login', loginController);
authRouter.get('/logout', logoutController);
authRouter.delete('/deleteAccount', deleteAccountController);

export default authRouter;
