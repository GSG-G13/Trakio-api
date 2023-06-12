import connection from '../config/connection';
import Query from '../../interfaces/query';

const getProjectsQuery = (userId: number) => {
  const sql: Query = {
    text: `SELECT p.title, p.description, p.created_at, pu.project_id, pu.user_id, r.role
            FROM projects p 
            INNER JOIN project_users pu 
            ON p.id = pu.project_id
            INNER JOIN roles r 
            ON pu.role_id = r.id
            WHERE pu.user_id = $1 `,
    values: [userId],
  }
  return connection.query(sql);
};
const deleteProjectById = (projectId:number) => {
  const query:Query = {
    text: 'DELETE FROM projects WHERE id = $1',
    values: [projectId],
  };

  return connection.query(query);
};
export { getProjectsQuery, deleteProjectById };
