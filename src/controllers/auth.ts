import bcrypt, { compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../validation';
import { getUserData, signupQuery, emailExists } from '../database/query';
import { CustomError, signToken } from '../helper';
import { TokenRequest, joiInterface, userData } from '../interfaces';
import { signupSchema } from '../validation/schema';

const signup = (req: Request, res: Response, next: NextFunction): void => {
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
    .then(() => emailExists(email))
    .then((exists) => {
      if (exists.rows[0].exists !== false) {
        next(new CustomError(406, 'Email already exists'));
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
    .catch((err: CustomError | joiInterface) => {
      if ('isJoi' in err) {
        next(new CustomError(406, err.details[0].message));
      } else {
        next(new CustomError(500, 'server error'));
      }
    });
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
    .then((data) => getUserData(data.email))
    .then(({ rows }) => {
      if (rows.length <= 0) next(new CustomError(406, 'wrong email'));
      userInfo = {
        id: rows[0].id, name: rows[0].name, email: rows[0].email, phone: rows[0].phone,
      };
      return compare(password, rows[0].password);
    })
    .then((isMatch) => {
      if (!isMatch) next(new CustomError(406, 'Please enter correct password'));
      return signToken({
        email, id: userInfo.id, name: userInfo.name, phone: userInfo.phone,
      });
    })
    .then((token) => res.cookie('token', token).json({
      message: 'Logged In Successfully',
      data: [userInfo],
    }))
    .catch((err: CustomError | joiInterface) => {
      if ('isJoi' in err) {
        next(new CustomError(406, err.details[0].message));
      } else {
        next(new CustomError(500, 'server error'));
      }
    });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged Out Successfully' });
};

export { signup, loginController, logout };
