import connection from '../config';
import { Query } from '../../interfaces';

const signupQuery = ({
  name, email, password, phone,
}: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const userSql = {
    text: `INSERT INTO users (name, email, password, phone)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, phone`,
    values: [name, email, password, phone],
  };
  return connection.query(userSql);
};

const getUserDataQuery = (email: string) => {
  const query: Query = {
    text: 'SELECT id, name, email, phone, password FROM users WHERE email=$1;',
    values: [email],
  };
  return connection.query(query);
};

const emailExistsQuery = (email:string) => {
  const query:Query = {
    text: 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)',
    values: [email],
  };
  return connection.query(query);
};

export {
  signupQuery,
  getUserDataQuery,
  emailExistsQuery,
};
