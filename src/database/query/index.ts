import { getProjectsQuery, deleteProjectById, getProjectByProjectIDQuery } from './projects';
import { addTaskQuery, deleteTaskByIdQuery, getTasksByUserId } from './tasks';
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
  getTasksByUserId,
};
