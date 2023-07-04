import express from 'express';
import {
  signupController,
  loginController,
  logoutController,
  deleteAccountController,
  getUserDataController,
} from '../controllers';
import { checkAuth } from '../middleware';

const authRouter = express.Router();

authRouter.post('/signup', signupController);
authRouter.post('/login', loginController);
authRouter.get('/logout', logoutController);
authRouter.get('/user', checkAuth, getUserDataController)
authRouter.delete('/account', checkAuth, deleteAccountController);

export default authRouter;
