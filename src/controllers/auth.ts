import { compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../validation';
import emailExists from '../database/query/user';
import { CustomError, signToken } from '../helper';
import { LoginRequest } from '../interfaces/userData';

const loginController = (req: Request, res: Response, next: NextFunction): void => {
  const { body: { password, email } } = req;

  const loginRequest: LoginRequest = {
    password,
    email,
  };

  loginSchema.validateAsync(loginRequest)
    .then(data=> console.log(data))
    // .then(({ email }) => emailExists({ email }))
    // .then(({ rows }) => {
    //   if (rows.length <= 0) throw new CustomError(400, {message: 'Please enter correct password!' });
    //   const [user] = rows;
    //   req.user = user;
    //   return compare(password, rows[0].password);
    // })
    // .then((isMatch) => {
    //   if (!isMatch) throw new CustomError(401, { message: 'Please enter correct password' });
    //   return signToken({ email, id: req.user.id, username: req.user.username });
    // })
    // .then((token) => res.cookie('token', token).json({
    //   message: 'Logged In Successfully',
    // }))
    .catch((error: Error | CustomError) => {
      next(error);
    });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged Out Successfully' });
};
export { loginController, logout };
