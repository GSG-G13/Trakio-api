import { logout, loginController, signup } from './auth';
import {
  getProjects,
  deleteProject,
  getProjectByProjectId,
  addProjectController,
} from './project';
import {
  addTask, deleteTaskById, getTasks, getTasksByProjectAndSection,
} from './task';

export {
  loginController,
  logout,
  signup,
  getProjects,
  deleteProject,
  addTask,
  getTasks,
  getProjectByProjectId,
  deleteTaskById,
  addProjectController,
  getTasksByProjectAndSection,
};
