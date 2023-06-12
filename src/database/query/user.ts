import connection from '../config/connection';
import Query from '../../interfaces/query'

const emailExists = (email:string) => {
  const query:Query = {
    text: 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)',
    values: [email],
  };

  return connection.query(query);
};

const signupQuery = ({
  username, email, password, phone,
}: {
  username: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const userSql = {
    text: `INSERT INTO users (name, email, password, phone)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, email, phone`,
    values: [username, email, password, phone],
  };

  return connection.query(userSql);
};

export { emailExists, signupQuery };
