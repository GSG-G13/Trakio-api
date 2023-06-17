import connection from '../config'
import { Query } from '../../interfaces'

const getMembersByProjectQuery = (projectId: number) => {
  const query: Query = {
    text: `SELECT u.id, u.name, u.email, u.email, u.phone, r.role
          FROM users u JOIN project_users pu
          ON u.id = pu.user_id
          JOIN roles r
          ON r.id = pu.role_id
          WHERE pu.project_id = $1`,
    values: [projectId],
  };
  return connection.query(query);
}

const checkForMemberInProject = (userId: number, projectId:number) => {
  const query:Query = {
    text: `SELECT r.role
    FROM project_users pu
    JOIN roles r
    ON pu.role_id = r.id
    WHERE pu.user_id =$1 AND pu.project_id = $2`,
    values: [userId, projectId],
  }
  return connection.query(query)
}

export { getMembersByProjectQuery, checkForMemberInProject };
