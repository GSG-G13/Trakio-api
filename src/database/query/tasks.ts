import connection from '../config/connection';
import { Query } from '../../interfaces';

const addTaskQuery = ({
  id, title, description, priorityId, projectId, sectionId, dueDate,
}: {
    id: number,
    title: string,
    description: string,
    priorityId: number,
    projectId: number,
    sectionId: number,
    dueDate: string,
}) => {
  const sql: Query = {
    text: `INSERT INTO tasks(id, title, description, priority_id, project_id, section_id, due_date)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING title, description, priority_id, project_id, section_id, due_date`,
    values: [id, title, description, priorityId, projectId, sectionId, dueDate],
  };
  return connection.query(sql);
}

export default addTaskQuery;
