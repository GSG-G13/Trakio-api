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
  getAllUserQuery,
  emailExistsQuery,
  deleteAccountQuery,
} from './user';
import getSectionsQuery from './section';
import { getAttachmentQuery, addAttachmentQuery } from './attachment';
import { getMembersByProjectQuery, checkForMemberInProject } from './members';

export {
  addProjectQuery,
  deleteAccountQuery,
  getAllUserQuery,
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
  checkForMemberInProject,
};
