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
  getTaskByProjectAndSectionQuery,
} from './tasks';
import {
  getUserData,
  emailExists,
  signupQuery,
} from './user';
import getSectionsQuery from './section';
import { getAttachmentQuery, addAttachmentQuery } from './attachment';

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
  getTaskByProjectAndSectionQuery,
  getSectionsQuery,
  getAttachmentQuery,
  addAttachmentQuery,
};
