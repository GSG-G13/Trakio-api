import connection from '../config';
import { Query } from '../../interfaces';

const getSectionsQuery = () => {
  const sql: Query = {
    text: 'SELECT * FROM sections',
    values: [],
  }
  return connection.query(sql);
};
export default getSectionsQuery;
