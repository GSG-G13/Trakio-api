import {
  addProjectQuery,
  addProjectUserQuery,
  getProjectsQuery,
  getProjectByProjectIDQuery,
  deleteProjectByIdQuery,
  updateProjectByIdQuery,
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
import getPrioritiesQuery from './priority';
import { getAttachmentQuery, addAttachmentQuery } from './attachment';
import { getMembersByProjectQuery, checkForMemberInProject, addMemberToProject } from './members';

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
  updateProjectByIdQuery,
  addMemberToProject,
  getPrioritiesQuery,
};
