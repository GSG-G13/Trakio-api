import { Secret, verify, sign } from 'jsonwebtoken';
import { } from 'dotenv/config';

const { SECRET_KEY } = process.env;

const verifyToken = (token: string): Promise<string> => new Promise((resolve, reject) => {
  verify(token, SECRET_KEY as Secret, (error, decoded) => {
    if (error) reject(error);
    resolve(decoded as string);
  });
});

const signToken = (payload:object): Promise<string> => new Promise((resolve, reject) => {
  sign(payload, SECRET_KEY as Secret, (error, token) => {
    if (error) reject(error);
    resolve(token as string);
  });
});

export default { verifyToken, signToken };
