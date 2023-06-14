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
  deleteTaskByIdQuery,
  getTaskByProjectAndSectionQuery,
} from './tasks';
import {
  getUserData,
  emailExists,
  signupQuery,
} from './user';
import getSectionsQuery from './section';
import getAttachmentQuery from './attachment';

export {
  addProjectQuery,
  addProjectUserQuery,
  getProjectsQuery,
  getProjectByProjectIDQuery,
  deleteProjectById,
  addTaskQuery,
  getTasksByUserId,
  deleteTaskByIdQuery,
  getUserData,
  emailExists,
  signupQuery,
  getTaskByProjectAndSectionQuery,
  getSectionsQuery,
  getAttachmentQuery,
};
