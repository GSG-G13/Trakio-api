import bcrypt, { compare } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import {
  signupQuery,
  getUserDataQuery,
  emailExistsQuery,
  deleteAccountQuery,
} from '../database';
import {
  CustomError, signToken, signupSchema, loginSchema,
} from '../helpers';
import { TokenRequest, userData, joiInterface } from '../interfaces';
import { getAllUserQuery } from '../database/query';

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
    .then((token) => res.status(201).cookie('token', token).json({
      message: 'Created successfully',
      data: [{ name, email, phone }],
    }))
    .catch((err: CustomError | joiInterface) => {
      if ('isJoi' in err) {
        next(new CustomError(406, err.details[0].message));
      } else {
        next(err);
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
    .then((token) => res.status(200).cookie('token', token).json({
      message: 'Logged In Successfully',
      data: [userInfo],
    }))
    .catch((err: CustomError | joiInterface) => {
      if ('isJoi' in err) {
        next(new CustomError(406, err.details[0].message));
      } else {
        next(err);
      }
    });
};

const logoutController = (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged Out Successfully' });
};

const deleteAccountController = (req: TokenRequest, res: Response, next: NextFunction): void => {
  const userId = req.userData?.id;
  deleteAccountQuery(+userId!)
    .then(() => {
      res.clearCookie('token').json({ message: 'Account deleted successfully' });
    })
    .catch((err: CustomError) => {
      next(err);
    });
};

const getUserDataController = (req: TokenRequest, res:Response) => {
  res.status(200).json({
    userData: req.userData,
  })
}

const getAllUserController = (req: TokenRequest, res: Response, next: NextFunction) => {
  getAllUserQuery()
    .then((data: QueryResult) => {
      res.status(200).json({
        message: 'Fetch All Users Successfully',
        data: data.rows,
      });
    })
    .catch(() => next(new CustomError(500, 'Server Error')));
};
export {
  signupController,
  loginController,
  logoutController,
  deleteAccountController,
  getUserDataController,
  getAllUserController,
};
