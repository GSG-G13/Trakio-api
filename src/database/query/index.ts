import { getProjectsQuery, deleteProjectById } from './projects';
import { addTaskQuery, deleteTaskByIdQuery } from './tasks';
import { getUserData, signupQuery, emailExists } from './user';

export {
  getUserData,
  getProjectsQuery,
  deleteProjectById,
  addTaskQuery,
  deleteTaskByIdQuery,
  signupQuery,
  emailExists,
};
