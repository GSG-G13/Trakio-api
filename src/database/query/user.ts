import connection from '../config/connection';
import Query from '../../interfaces/query';

const getUserData = (email: string) => {
  const query: Query = {
    text: 'SELECT id, name, email, phone, password FROM users WHERE email=$1;',
    values: [email],
  };
  return connection.query(query);
};

const emailExists = (email:string) => {
  const query:Query = {
    text: 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)',
    values: [email],
  };

  return connection.query(query);
};

export { emailExists, getUserData };
