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

const getAllUserQuery = (id: number) => {
  const query: Query = {
    text: `
    SELECT users.id, users.name, users.email, users.phone
    FROM users
    LEFT OUTER JOIN project_users ON users.id = project_users.user_id
    AND project_users.project_id = $1
    WHERE project_users.user_id IS NULL
    ORDER BY users.name ASC;
    `,
    values: [id],
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

const deleteAccountQuery = (userId: number) => {
  const query: Query = {
    text: 'DELETE FROM users WHERE id = $1;',
    values: [userId],
  };
  return connection.query(query);
};

export {
  signupQuery,
  getUserDataQuery,
  emailExistsQuery,
  deleteAccountQuery,
  getAllUserQuery,
};
