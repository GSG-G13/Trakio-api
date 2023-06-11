import connection from '../config/connection';

interface QueryResult {
  exists: boolean;
}

const emailExists = async (email: string): Promise<boolean> => {
  const query = {
    text: 'SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)',
    values: [email],
  };
  const result = await connection.query<QueryResult>(query);
  return result.rows[0].exists;
};

export default emailExists;
