import { getProjectsQuery, deleteProjectById, getProjectByProjectIDQuery } from './projects';
import { addTaskQuery, deleteTaskByIdQuery } from './tasks';
import { getUserData, signupQuery, emailExists } from './user';

export {
  getUserData,
  getProjectsQuery,
  deleteProjectById,
  addTaskQuery,
  deleteTaskByIdQuery,
  getProjectByProjectIDQuery,
  signupQuery,
  emailExists,
};
