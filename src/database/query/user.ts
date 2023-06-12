import connection from '../config/connection';
import Query from '../../interfaces/query'

const emailExists = (email:string) => {
  const query:Query = {
    text: 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)',
    values: [email],
  };

  return connection.query(query);
};

export default emailExists;
