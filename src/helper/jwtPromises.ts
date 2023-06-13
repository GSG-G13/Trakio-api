import {
  Secret, verify, sign,
} from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userData } from '../interfaces';

dotenv.config();

const { SECRET_KEY } = process.env;

const verifyToken = (token: string) => new Promise((resolve, reject) => {
  verify(token, SECRET_KEY as Secret, (error: Error | null, decoded) => {
    if (error) {
      reject(error);
    } else {
      resolve(decoded as userData);
    }
  });
});

const signToken = (payload: object): Promise<string> => new Promise((resolve, reject) => {
  sign(payload, SECRET_KEY as Secret, (error: Error | null, token) => {
    if (error) {
      reject(error);
    } else {
      resolve(token as string);
    }
  });
});

export { verifyToken, signToken };
