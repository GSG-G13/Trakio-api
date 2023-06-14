import {
  getProjectsQuery,
  deleteProjectById,
  getProjectByProjectIDQuery,
  addProjectQuery,
  addProjectUserQuery,
} from './projects';
import { addTaskQuery, deleteTaskByIdQuery } from './tasks';
import { getUserData, signupQuery, emailExists } from './user';

export {
  getUserData,
  addProjectQuery,
  getProjectsQuery,
  deleteProjectById,
  addTaskQuery,
  deleteTaskByIdQuery,
  addProjectUserQuery,
  getProjectByProjectIDQuery,
  signupQuery,
  emailExists,
};
