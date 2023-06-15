import { Query } from '../../interfaces'
import connection from '../config'

const getMembersByProjectQuery = (projectId: number) => {
  const query: Query = {
    text: `SELECT u.name, u.email, u.email, u.phone,  r.role
        FROM users u JOIN project_users pu
        ON u.id = pu.user_id
        JOIN roles r
        ON r.id = pu.role_id
        WHERE pu.project_id = $1`,
    values: [projectId],
  }
  return connection.query(query)
}

export default getMembersByProjectQuery;
