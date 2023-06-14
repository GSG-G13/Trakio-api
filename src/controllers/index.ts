import { logout, loginController, signup } from './auth';
import {
  getProjects,
  deleteProject,
  getProjectByProjectId,
  addProjectController,
} from './project';
import {
  addTask,
  getTasks,
  editTaskController,
  deleteTaskById,
  getTasksByProjectAndSection,
} from './task';

import getSections from './section';

export {
  loginController,
  logout,
  signup,
  getProjects,
  getProjectByProjectId,
  addProjectController,
  deleteProject,
  addTask,
  getTasks,
  editTaskController,
  deleteTaskById,
  getTasksByProjectAndSection,
  getSections,
};
