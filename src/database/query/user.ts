import connection from '../config/connection';
import Query from '../../interfaces/query';

const getUserData = (id: number) => {
  const query: Query = {
    text: 'SELECT name, email, phone FROM users WHERE id=$1;',
    values: [id],
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
