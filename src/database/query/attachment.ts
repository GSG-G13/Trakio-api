import connection from '../config';
import { Query } from '../../interfaces';

const getAttachmentQuery = (userId: number, taskId: number) => {
  const sql: Query = {
    text: 'SELECT * FROM attachments WHERE user_id = $1 and task_id = $2',
    values: [userId, taskId],
  }
  return connection.query(sql);
};
export default getAttachmentQuery;
