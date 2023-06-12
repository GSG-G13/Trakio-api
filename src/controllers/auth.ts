import { compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../validation';
import emailExists from '../database/query/user';
import { CustomError, signToken } from '../helper';
import { LoginRequest } from '../interfaces/userData';
import { TokenRequest } from '../interfaces';

const loginController = (req: TokenRequest, res: Response, next: NextFunction): void => {
  const { body: { password, email } } = req;
  let userInfo = [];
  loginSchema.validateAsync({ password, email })
    .then((data) => emailExists(data.email))
    .then(({ rows }) => {
      if (rows.length <= 0) throw new CustomError(400, 'Please enter correct password!');
      const [user] = rows;
      console.log(rows);
      userInfo = user;
      return compare(password, rows[0].password);
    })
    // .then((isMatch) => {
    //   if (!isMatch) throw new CustomError(401, 'Please enter correct password');
    //   return signToken({ email, id: userInfo.id, username: req.userData.username });
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
