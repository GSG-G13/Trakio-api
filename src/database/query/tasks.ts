import connection from '../config/connection';
import { Query, Task } from '../../interfaces';

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

const editTaskQuery = (task: Task) => {
  const sql = {
    text: `UPDATE tasks 
          SET title = $2, 
          description = $3, 
          project_id = $4,
          priority_id = (SELECT id FROM priorities WHERE priority = $5),
          section_id = (SELECT id FROM sections WHERE section = $6)
          WHERE id = $1
          RETURNING *`,
    values: [
      task.id,
      task.title,
      task.description,
      task.project_id,
      task.priority,
      task.section_id,
    ],
  };
  return connection.query(sql);
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
  editTaskQuery,
  deleteTaskByIdQuery,
};
