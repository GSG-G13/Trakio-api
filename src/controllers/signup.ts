import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { signupSchema } from '../validation/schema';
import { signupQuery, emailExists } from '../database/query/user';
import { signToken } from '../helper/jwtPromises';

const hashPassword = (userPassword: string): Promise<string> => bcrypt.hash(userPassword, 10);

const signup = (req: Request, res: Response): void => {
  const {
    username, password, email, phone,
  }: {
    username: string;
    password: string;
    email: string;
    phone: string;
  } = req.body;

  signupSchema
    .validateAsync({
      username, password, email, phone,
    }, { abortEarly: true })
    .then(() => emailExists(email))
    .then((exists) => {
      if (exists) {
        throw new Error('Email already exists');
      }

      return hashPassword(password);
    })
    .then((hash: string) => ({
      username, email, password: hash, phone,
    }))
    .then(({
      username, email, password, phone,
    }) => signupQuery({
      username, email, password, phone,
    }))
    .then((data) => data.rows[0])
    .then((row) => signToken(row))
    .then((token) => res.cookie('token', token).redirect('/'))
    .catch((err: Error) => console.log(err));
};

export default signup;
