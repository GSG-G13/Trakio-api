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

const getProjectByProjectIDQuery = (projectID: number) => {
  const query:Query = {
    text: ` SELECT p.id AS project_id, p.title AS title, p.description AS description, p.created_at AS created_at,u.id AS user_id, u.name AS name, u.email AS email, u.phone AS phone, r.role AS role 
            FROM projects p JOIN project_users pu
            ON p.id = pu.project_id 
            JOIN users u 
            ON pu.user_id = u.id
            JOIN roles r
            ON r.id = pu.role_id
            WHERE p.id = $1`,
    values: [projectID],
  }

  return connection.query(query)
}

export { getProjectsQuery, deleteProjectById, getProjectByProjectIDQuery };
