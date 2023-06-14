import connection from '../config';
import { Query } from '../../interfaces';

const addAttachmentQuery = (attachS3: string, userId: number, taskId: number) => {
  const sql: Query = {
    text: `INSERT INTO attachments (attach_s3, user_id, task_id)
            VALUES ($1, $2, $3)
            RETURNING *`,
    values: [attachS3, userId, taskId],
  }
  return connection.query(sql);
}
const getAttachmentQuery = (userId: number, taskId: number) => {
  const sql: Query = {
    text: 'SELECT * FROM attachments WHERE user_id = $1 and task_id = $2',
    values: [userId, taskId],
  }
  return connection.query(sql);
};
export { getAttachmentQuery, addAttachmentQuery };
