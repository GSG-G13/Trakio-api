import connection from '../config';
import { Query, TaskInterface } from '../../interfaces';

const addTaskQuery = ({
  title, description, priorityId, projectId, sectionId, dueDate, userId,
}: {
  title: string,
  description: string,
  priorityId: number,
  projectId: number,
  sectionId: number,
  dueDate: string,
  userId: number,
}) => {
  const sql: Query = {
    text: `INSERT INTO tasks (title, description, priority_id, project_id, section_id, due_date, user_id)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING title, description, priority_id, project_id, section_id, due_date`,
    values: [title, description, priorityId, projectId, sectionId, dueDate, userId],
  };
  return connection.query(sql);
};

const getTasksByUserIdQuery = (userId:number) => {
  const query:Query = {
    text: 'SELECT * FROM tasks WHERE user_id = $1',
    values: [userId],
  };
  return connection.query(query)
};

const getTaskByProjectAndSectionQuery = (projectId: number) => {
  const query: Query = {
    text: `SELECT t.id, t.title, t.description, pr.priority, s.section, p.title, t.created_at
          FROM tasks t JOIN projects p
          ON t.project_id = p.id
          JOIN sections s
          ON t.section_id = s.id
          JOIN priorities pr
          ON t.priority_id = pr.id
          WHERE p.id = $1`,
    values: [projectId],
  };
  return connection.query(query)
};

const editTaskQuery = (task: TaskInterface) => {
  const sql = {
    text: `UPDATE tasks SET title = $2, description = $3, project_id = $4,
          priority_id = $5, section_id = $6, user_id = $7 WHERE id = $1 RETURNING *`,
    values: [
      task.id,
      task.title,
      task.description,
      task.projectId,
      task.priorityId,
      task.sectionId,
      task.userId,
    ],
  };
  return connection.query(sql);
};

const deleteTaskByIdQuery = (taskId: number) => {
  const sql: Query = {
    text: 'DELETE FROM tasks WHERE id = $1 RETURNING *',
    values: [taskId],
  };
  return connection.query(sql);
};

export {
  addTaskQuery,
  getTasksByUserIdQuery,
  getTaskByProjectAndSectionQuery,
  editTaskQuery,
  deleteTaskByIdQuery,
};
