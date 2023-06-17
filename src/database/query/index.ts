import {
  addProjectQuery,
  addProjectUserQuery,
  getProjectsQuery,
  getProjectByProjectIDQuery,
  deleteProjectByIdQuery,
} from './projects';
import {
  addTaskQuery,
  getTasksByUserIdQuery,
  getTaskByProjectAndSectionQuery,
  editTaskQuery,
  deleteTaskByIdQuery,
} from './tasks';
import {
  signupQuery,
  getUserDataQuery,
  emailExistsQuery,
} from './user';
import getSectionsQuery from './section';
import { addAttachmentQuery, getAttachmentQuery } from './attachment';
import getMembersByProjectQuery from './members';

export {
  addProjectQuery,
  addProjectUserQuery,
  getProjectsQuery,
  getProjectByProjectIDQuery,
  deleteProjectByIdQuery,
  addTaskQuery,
  getTasksByUserIdQuery,
  getTaskByProjectAndSectionQuery,
  editTaskQuery,
  deleteTaskByIdQuery,
  signupQuery,
  getUserDataQuery,
  emailExistsQuery,
  getSectionsQuery,
  addAttachmentQuery,
  getAttachmentQuery,
  getMembersByProjectQuery,
};
