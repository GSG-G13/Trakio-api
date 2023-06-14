import {
  addProjectQuery,
  addProjectUserQuery,
  getProjectsQuery,
  getProjectByProjectIDQuery,
  deleteProjectById,
} from './projects';
import {
  addTaskQuery,
  getTasksByUserId,
  editTaskQuery,
  deleteTaskByIdQuery,
  getTaskByProjectAndSection,
} from './tasks';
import {
  getUserData,
  emailExists,
  signupQuery,
} from './user';
import getSectionsQuery from './section';

export {
  addProjectQuery,
  addProjectUserQuery,
  getProjectsQuery,
  getProjectByProjectIDQuery,
  deleteProjectById,
  addTaskQuery,
  getTasksByUserId,
  editTaskQuery,
  deleteTaskByIdQuery,
  getUserData,
  emailExists,
  signupQuery,
  getTaskByProjectAndSection,
  getSectionsQuery,
};
