import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { log } from 'console';
import { signupSchema } from '../validation/schema';
import { signupQuery, emailExists } from '../database/query/user';
import { signToken } from '../helper/jwtPromises';

const hashPassword = (userPassword: string): Promise<string> => bcrypt.hash(userPassword, 10);

const signup = (req: Request, res: Response): void => {
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
        throw new Error('Email already exists');
      }
      return hashPassword(password);
    })
    .then((hash: string) => ({
      name, email, password: hash, phone,
    }))
    .then(() => signupQuery({
      name, email, password, phone,
    }))
    .then((data) => data.rows[0])
    .then((row) => signToken(row))
    .then((token) => res.cookie('token', token).json({
      message: 'Created successfully',
      data: [{ name, email, phone }],
    }))
    .catch((err: Error) => log(err));
};

export default signup;
