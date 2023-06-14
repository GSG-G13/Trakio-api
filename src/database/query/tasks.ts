import connection from '../config/connection';
import { Query } from '../../interfaces';

const addTaskQuery = ({
  title, description, priorityId, projectId, sectionId, dueDate,
}: {
  title: string,
  description: string,
  priorityId: number,
  projectId: number,
  sectionId: number,
  dueDate: string,
}) => {
  const sql: Query = {
    text: `INSERT INTO tasks (title, description, priority_id, project_id, section_id, due_date)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING title, description, priority_id, project_id, section_id, due_date`,
    values: [title, description, priorityId, projectId, sectionId, dueDate],
  };
  return connection.query(sql);
};

const getTasksByUserId = (userId:number) => {
  const query:Query = {
    text: 'SELECT * FROM tasks WHERE user_id = $1',
    values: [userId],
  };

  return connection.query(query)
};

const deleteTaskByIdQuery = (taskId: number) => {
  const sql: Query = {
    text: 'DELETE FROM tasks WHERE id = $1',
    values: [taskId],
  }
  return connection.query(sql);
};

export {
  addTaskQuery,
  getTasksByUserId,
  deleteTaskByIdQuery,
};
