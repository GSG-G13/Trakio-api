import connection from '../config';
import { Query } from '../../interfaces';

// eslint-disable-next-line max-len
const addAttachmentQuery = (attachS3: string, userId: number, taskId: number, attachmentName: string) => {
  const sql: Query = {
    text: `INSERT INTO attachments (attach_s3, user_id, task_id, attachment_name)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
    values: [attachS3, userId, taskId, attachmentName],
  };
  return connection.query(sql);
};

const getAttachmentQuery = (projectId: number) => {
  const sql: Query = {
    text: `SELECT a.id, a.attachment_name, a.attach_s3, t.id AS taskId, t.title, u.id AS user_id, u.name, u.email
            FROM attachments a
            JOIN tasks t
            ON(a.task_id = t.id)
            JOIN users u
            ON(a.user_id = u.id)
            JOIN projects p
            ON(t.project_id = p.id)
            WHERE p.id = $1`,
    values: [projectId],
  };
  return connection.query(sql);
};

export { addAttachmentQuery, getAttachmentQuery };
