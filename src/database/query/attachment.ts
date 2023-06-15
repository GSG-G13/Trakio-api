import connection from '../config';
import { Query } from '../../interfaces';

const addAttachmentQuery = ({
  attachS3, userId, taskId,
}: {
    attachS3: Text,
    userId: number,
    taskId: number,
        }) => {
  const sql: Query = {
    text: `INSERT INTO attachments (attach_s3, user_id, task_id)
            VALUES ($1, $2, $3)
            RETURNING attach_s3, user_id, task_id`,
    values: [attachS3, userId, taskId],
  }
  return connection.query(sql);
}

export default addAttachmentQuery;
