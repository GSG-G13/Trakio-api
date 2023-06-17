import connection from '../config';
import { Query } from '../../interfaces';

const addProjectQuery = (title: string, description: string) => {
  const sql: Query = {
    text: `INSERT INTO projects (title, description) 
          VALUES ($1, $2) RETURNING *;`,
    values: [title, description],
  };
  return connection.query(sql);
};

const addProjectUserQuery = (userId: number, projectId: number, roleId: number) => {
  const sql: Query = {
    text: `INSERT INTO project_users (user_id, project_id, role_id)
    VALUES ($1, $2, $3) Returning *`,
    values: [userId, projectId, roleId],
  };
  return connection.query(sql);
};

const getProjectsQuery = (userId: number) => {
  const sql: Query = {
    text: `SELECT p.title, p.description, p.created_at, pu.project_id, pu.user_id, r.role
            FROM projects p 
            INNER JOIN project_users pu 
            ON p.id = pu.project_id
            INNER JOIN roles r 
            ON pu.role_id = r.id
            WHERE pu.user_id = $1`,
    values: [userId],
  };
  return connection.query(sql);
};

const getProjectByProjectIDQuery = (projectID: number) => {
  const query: Query = {
    text: 'SELECT * FROM projects WHERE id = $1',
    values: [projectID],
  };
  return connection.query(query);
};

const deleteProjectByIdQuery = (projectId:number) => {
  const query:Query = {
    text: 'DELETE FROM projects WHERE id = $1',
    values: [projectId],
  };
  return connection.query(query);
};

export {
  addProjectQuery,
  addProjectUserQuery,
  getProjectsQuery,
  getProjectByProjectIDQuery,
  deleteProjectByIdQuery,
};
