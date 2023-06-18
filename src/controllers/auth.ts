import bcrypt, { compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { log } from 'console';
import {
  signupQuery,
  getUserDataQuery,
  emailExistsQuery,
} from '../database';
import {
  CustomError, signToken, signupSchema, loginSchema,
} from '../helpers';
import { TokenRequest, userData } from '../interfaces';

const signupController = (req: Request, res: Response, next: NextFunction): void => {
  const {
    name, password, email, phone,
  }: {
    name: string;
    password: string;
    email: string;
    phone: string;
    } = req.body;

  signupSchema
    .validateAsync({
      name, password, email, phone,
    }, { abortEarly: true })
    .then(() => emailExistsQuery(email))
    .then((exists) => {
      if (exists.rows[0].exists !== false) {
        throw new CustomError(406, 'Email already exists');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash: string) => (signupQuery({
      name, email, password: hash, phone,
    })))
    .then((data) => data.rows[0])
    .then((row) => signToken(row))
    .then((token) => res.cookie('token', token).json({
      message: 'Created successfully',
      data: [{ name, email, phone }],
    }))
    .catch((error) => next(error));
};

const loginController = (req: TokenRequest, res: Response, next: NextFunction) => {
  const { body: { password, email } } = req;
  let userInfo: userData = {
    id: '',
    name: '',
    email: '',
    phone: '',
  };

  loginSchema.validateAsync({ password, email })
    .then((data) => getUserDataQuery(data.email))
    .then(({ rows }) => {
      if (rows.length <= 0) throw new CustomError(406, 'wrong email');
      userInfo = {
        id: rows[0].id, name: rows[0].name, email: rows[0].email, phone: rows[0].phone,
      };
      return compare(password, rows[0].password);
    })
    .then((isMatch) => {
      if (!isMatch) throw new CustomError(406, 'Please enter correct password');
      return signToken({
        email, id: userInfo.id, name: userInfo.name, phone: userInfo.phone,
      });
    })
    .then((token) => res.cookie('token', token).json({
      message: 'Logged In Successfully',
      data: [userInfo],
    }))
    .then((token) => {
      log(token, 'created');
    })
    .catch((error) => next(error));
};

const logoutController = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged Out Successfully' });
};

export { signupController, loginController, logoutController };
