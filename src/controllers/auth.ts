import { compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../validation';
import { getUserData } from '../database/query/user';
import { CustomError, signToken } from '../helper';
import { TokenRequest, userData } from '../interfaces';

const loginController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const { body: { password, email } } = req;
  let userInfo: userData = {
    id: '',
    name: '',
    email: '',
    phone: '',
  };
  loginSchema.validateAsync({ password, email })
    .then((data) => getUserData(data.email))
    .then(({ rows }) => {
      if (rows.length <= 0) res.send('wrong email');
      userInfo = {
        id: rows[0].id, name: rows[0].name, email: rows[0].email, phone: rows[0].phone,
      };
      return compare(password, rows[0].password);
    })
    .then((isMatch) => {
      if (!isMatch) throw new CustomError(401, 'Please enter correct password');
      return signToken({
        email, id: userInfo.id, name: userInfo.name, phone: userInfo.phone,
      });
    })
    .then((token) => res.cookie('token', token).json({
      message: 'Logged In Successfully',
      data: [userInfo],
    }))
    .catch((error: Error | CustomError) => {
      next(error);
    });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged Out Successfully' });
};
export { loginController, logout };
