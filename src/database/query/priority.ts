import connection from '../config';
import { Query } from '../../interfaces';

const getPrioritiesQuery = () => {
  const sql: Query = {
    text: 'SELECT * FROM priorities',
    values: [],
  };
  return connection.query(sql);
};

export default getPrioritiesQuery;
